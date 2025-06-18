// src/app/api/auth/[...nextauth]/route.ts
// Este é o arquivo de API para o NextAuth.js (Auth.js).
// Ele define como o NextAuth.js lida com a autenticação.

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Importa sua função customizada de signIn que interage com sua API de backend.
import { signIn as authServiceSignIn } from "@/services/auth";
import { AuthUser } from "@/model/AuthUser"; // Importa AuthUser para tipagem.

const handler = NextAuth({
  // --- Provedores de Autenticação ---
  providers: [
    CredentialsProvider({
      // ID único para este provedor (usado em nextAuthSignIn("credentials", ...))
      id: "credentials",
      name: "Credentials",
      // Define os campos que NextAuth.js espera (email e password do seu formulário).
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // A função 'authorize' é onde você valida as credenciais com sua API de backend.
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Dados de login não fornecidos.");
        }

        try {
          // Chama sua função de signIn personalizada (que faz a requisição para sua API).
          const result = await authServiceSignIn({
            email: credentials.email,
            password: credentials.password,
          });

          if (result && result.user && result.token) {
            // Se o login com sua API for bem-sucedido, retorne um objeto 'User' para NextAuth.js.
            // Este objeto 'User' é o que é passado para o callback 'jwt'.
            // Ele deve ter um 'id' (obrigatório pelo NextAuth.js) e outras propriedades que você quer na sessão.
            return {
              id: result.user.id, // ID do usuário (obrigatório)
              name: result.user.name,
              email: result.user.email,
              image: result.user.imageUrl, // Mapeia 'imageUrl' da sua API para a propriedade 'image' do NextAuth.js (para avatares).
              type: result.user.type, // Seu UserType
              accessToken: result.token, // Seu token de acesso
              refreshToken: result.refreshToken, // Seu refresh token (camelCase)
            } as AuthUser; // Opcional: Cast para AuthUser para garantir tipagem em tempo de desenvolvimento.
          }
          return null; // Retorne null se as credenciais forem inválidas.
        } catch (error: any) {
          console.error("Erro na autorização do NextAuth:", error);
          // Lança um erro que NextAuth.js pode exibir na URL (ex: /signin?error=CredentialsSignin)
          // ou que você pode capturar no seu LoginForm.
          throw new Error(
            error.message ||
              "Credenciais inválidas. Por favor, tente novamente."
          );
        }
      },
    }),
    // Você pode adicionar outros provedores aqui (Google, Facebook, etc.)
  ],

  // --- Gerenciamento de Sessão ---
  session: {
    strategy: "jwt", // Usa JSON Web Tokens para gerenciar a sessão (cookies HTTP-only).
    maxAge: 30 * 24 * 60 * 60, // Duração da sessão: 30 dias.
  },

  // --- Callbacks ---
  // Callbacks são funções que são executadas em momentos específicos do ciclo de vida da autenticação.
  callbacks: {
    // O callback 'jwt' é chamado quando um JWT é criado (no login) ou atualizado.
    // Ele é a base para o token de sessão que é armazenado no cookie.
    async jwt({ token, user, account }) {
      if (account && user) {
        // Se o usuário acabou de fazer login (user e account estão presentes).
        // Adicionamos as propriedades personalizadas do usuário (token de acesso, refresh token, e o objeto user)
        // ao objeto 'token' JWT.
        token.accessToken = (user as any).accessToken; // Adiciona o accessToken que veio do 'authorize'.
        token.refreshToken = (user as any).refreshToken; // Adiciona o refreshToken.
        token.user = user as AuthUser; // Guarda o objeto completo do usuário dentro do token JWT.
      }
      return token; // Retorna o token JWT (modificado).
    },
    // O callback 'session' é chamado sempre que uma sessão é acessada.
    // Ele expõe os dados do token JWT para o objeto de sessão do cliente.
    async session({ session, token }) {
      // Adiciona as propriedades personalizadas do token JWT ao objeto de sessão.
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken;
      }
      if (token.user) {
        session.user = token.user as AuthUser; // Garante que session.user seja do tipo AuthUser.
      }
      return session; // Retorna o objeto de sessão (modificado).
    },
  },

  // --- Páginas Customizadas ---
  // Define as URLs para páginas customizadas de login, erro, etc.
  pages: {
    signIn: "/signin", // Redireciona para sua página de login customizada.
    // error: '/signin', // Opcional: Redirecionar erros de volta para a página de login.
  },

  // --- Chave Secreta e Debug ---
  secret: process.env.NEXTAUTH_SECRET, // Chave secreta para criptografar tokens e cookies.
  debug: process.env.NODE_ENV === "development", // Ativa o modo de depuração em desenvolvimento.
});

// Exporta o handler para as requisições GET e POST da API.
export { handler as GET, handler as POST };
