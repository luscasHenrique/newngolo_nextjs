// src/app/api/auth/[...nextauth]/route.ts
// Este é o arquivo de API para o NextAuth.js (Auth.js).
// Ele define como o NextAuth.js lida com a autenticação.

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Importa sua função customizada de signIn que interage com sua API de backend.
import { signIn as authServiceSignIn } from "@/services/auth";

// Importa os modelos de usuário que você definiu.
// AuthUser: O tipo de usuário mínimo que vem diretamente da sua API de login.
// UserProfile: O tipo de usuário completo que você busca do endpoint /user/perfil.
import { AuthUser } from "@/models/AuthUser";
import { UserProfile } from "@/models/UserProfile";

const handler = NextAuth({
  // --- Provedores de Autenticação ---
  // Define como os usuários podem fazer login na sua aplicação.
  providers: [
    CredentialsProvider({
      // ID único para este provedor (usado em nextAuthSignIn("credentials", ...)).
      id: "credentials",
      name: "Credentials",
      // Define os campos que NextAuth.js espera para o formulário de login.
      // Estes campos são enviados para a função 'authorize'.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // A função 'authorize' é onde a validação das credenciais acontece.
      // Ela é executada no servidor e interage com sua API de backend.
      async authorize(credentials, req) {
        // Garante que as credenciais foram fornecidas.
        if (!credentials) {
          throw new Error("Dados de login não fornecidos.");
        }

        try {
          // PASSO 1: Chama sua função de signIn personalizada (que faz a requisição HTTP para sua API de backend).
          // authServiceSignIn retorna um objeto Auth (que contém AuthUser e tokens).
          const authResult = await authServiceSignIn({
            email: credentials.email,
            password: credentials.password,
          });

          // Se a autenticação com sua API de backend for bem-sucedida (status 200 OK e dados presentes).
          if (authResult && authResult.user && authResult.token) {
            // Retorna um objeto 'User' para NextAuth.js.
            // Este objeto 'User' (que estende AuthUser) será passado para o callback 'jwt'.
            // Optamos por incluir o 'email' das credenciais aqui, pois a sua API de login
            // não retorna o email diretamente no objeto 'user' do Auth (AuthUser).
            return {
              id: authResult.user.id, // ID do usuário (obrigatório pelo NextAuth.js).
              name: authResult.user.name,
              email: credentials.email, // <--- Pegamos o email das CREDENCIAIS como fallback/fonte inicial.
              image: authResult.user.imageUrl, // Mapeia 'imageUrl' do AuthUser para a propriedade 'image' padrão do NextAuth.js (para avatares).
              type: authResult.user.type, // Seu UserType.
              accessToken: authResult.token, // Seu token de acesso.
              refreshToken: authResult.refreshToken, // Seu refresh token.
              // As propriedades acima devem estar presentes na interface 'User' que estende 'AuthUser'.
            } as AuthUser; // Caste para AuthUser (o tipo que NextAuth.js vai ver aqui).
          }
          // Retorna null se as credenciais forem inválidas ou a API não retornar sucesso.
          return null;
        } catch (error: any) {
          console.error(
            "DEBUG [route.ts]: Erro na autorização do NextAuth (authServiceSignIn falhou):",
            error
          );
          // Lança um erro que NextAuth.js pode capturar para exibir uma mensagem adequada no frontend.
          throw new Error(
            error.message ||
              "Credenciais inválidas. Por favor, tente novamente."
          );
        }
      },
    }),
    // Você pode adicionar outros provedores (ex: GoogleProvider, FacebookProvider) aqui, se necessário.
  ],

  // --- Gerenciamento de Sessão ---
  // Define como a sessão do usuário é armazenada e acessada.
  session: {
    strategy: "jwt", // Usa JSON Web Tokens (JWTs) para gerenciar a sessão (armazenados em cookies HTTP-only).
    maxAge: 30 * 24 * 60 * 60, // Duração da sessão: 30 dias (em segundos).
  },

  // --- Callbacks ---
  // Callbacks são funções personalizadas executadas em momentos específicos do ciclo de vida da autenticação.
  callbacks: {
    // O callback 'jwt' é chamado quando um JWT é criado (no login) ou atualizado (no acesso à sessão).
    // Ele é fundamental para construir o token JWT que será armazenado no cookie.
    async jwt({ token, user, account }) {
      // 'user' estará presente apenas no primeiro login (vindo de 'authorize').
      if (account && user) {
        // Mapeamos as propriedades do 'user' (vindo de 'authorize') para o objeto 'token' JWT.
        // O tipo 'user' aqui é 'User | AdapterUser', que estende seu 'AuthUser'.
        const authUserFromAuthorize = user as AuthUser;

        token.accessToken = authUserFromAuthorize.accessToken;
        token.refreshToken = authUserFromAuthorize.refreshToken;

        // Criamos um sub-objeto 'user' dentro do token JWT com as propriedades essenciais.
        // Isso ajuda a manter o tamanho do cookie da sessão otimizado, evitando o aviso CHUNKING_SESSION_COOKIE.
        token.user = {
          id: authUserFromAuthorize.id,
          name: authUserFromAuthorize.name,
          email: authUserFromAuthorize.email, // Email estará aqui (do input de login).
          image: authUserFromAuthorize.image || authUserFromAuthorize.imageUrl, // Mapeia 'image' ou 'imageUrl' para 'image'.
          type: authUserFromAuthorize.type,
          // Propriedades como 'nickname', 'cpf', 'address' (que estão no UserProfile completo)
          // NÃO são adicionadas aqui para manter o token leve. Elas serão buscadas via 'useUserProfile' no cliente.
        } as AuthUser; // Atribui um objeto que satisfaz 'AuthUser' ao 'token.user'.
        // Não precisa de Partial<AuthUser> se AuthUser tem 'id', 'name', 'email' como obrigatórios.
      }
      return token; // SEMPRE retorna o objeto 'token' modificado.
    },

    // O callback 'session' é chamado sempre que uma sessão é acessada no lado do cliente ou servidor.
    // Ele expõe os dados do token JWT para o objeto de sessão (`session`) que seus componentes acessarão.
    async session({ session, token }) {
      // Adiciona as propriedades personalizadas do token JWT ('accessToken', 'refreshToken', 'user')
      // ao objeto de sessão que será acessível no cliente (via `useSession()`).
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken;
      }
      if (token.user) {
        session.user = token.user as AuthUser; // O objeto 'session.user' será do tipo 'AuthUser' (mínimo).
      }
      return session; // Retorna o objeto de sessão (modificado).
    },
  },

  // --- Páginas Customizadas ---
  // Define as URLs para páginas customizadas de login, erro, etc.
  pages: {
    signIn: "/signin", // Redireciona para sua página de login customizada.
    // error: '/signin', // Opcional: Configurar uma página de erro customizada.
  },

  // --- Chave Secreta e Debug ---
  secret: process.env.NEXTAUTH_SECRET, // Chave secreta para criptografar tokens e cookies.
  debug: process.env.NODE_ENV === "development", // Ativa o modo de depuração em desenvolvimento.
});

// Exporta o handler para as requisições GET e POST da API do NextAuth.js.
export { handler as GET, handler as POST };
