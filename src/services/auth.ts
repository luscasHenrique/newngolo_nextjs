// src/services/auth.ts
// Este arquivo contém as funções para interagir com sua API de autenticação.

import { api } from "./api"; // Importa a instância do Axios que configuramos em src/services/api.ts

// Importa os tipos de modelo de autenticação.
// - Auth é a interface da resposta COMPLETA da API de login.
// - AuthPayload é a interface dos DADOS QUE ENVIAMOS para login (email, password, grant_type).
// - AuthUser é a interface para o OBJETO DE USUÁRIO retornado pela API.
import { Auth as AuthResponseModel, AuthPayload } from "../models/Auth";
import { AuthUser } from "../models/AuthUser"; // AuthUser é importado DIRETAMENTE de seu próprio arquivo.

import { env } from "../config/env"; // Suas variáveis de ambiente configuradas em src/config/env.ts

/**
 * Realiza o login do usuário com email e senha na API de backend.
 * As credenciais são enviadas via Basic Auth no cabeçalho 'Authorization'
 * E com 'grant_type: "client_credentials"' no corpo da requisição JSON,
 * replicando o comportamento que funcionava no seu projeto React antigo.
 *
 * Esta função é chamada pelo `authorize` callback do NextAuth.js (Auth.js) no servidor.
 * Por isso, ela NÃO DEVE acessar `localStorage` ou `window`.
 *
 * @param payload Objeto contendo o email, a senha e opcionalmente o grant_type.
 * @returns Retorna os dados completos da autenticação (usuário, token, refreshToken) vindos da API.
 * @throws Lança um erro em caso de falha na autenticação (ex: credenciais inválidas, erro de rede, erro 500 da API).
 */
export const signIn = async (
  payload: AuthPayload
): Promise<AuthResponseModel> => {
  try {
    const { email, password } = payload; // Obtém email e password do payload.

    // 1. Prepara o cabeçalho 'Authorization' com Basic Auth.
    // 'btoa()' é uma função global (disponível no Node.js do servidor Next.js).
    const basicAuthHeader = btoa(`${email}:${password}`);

    // 2. Prepara o corpo da requisição JSON.
    // Inclui 'grant_type: "client_credentials"' conforme o que seu projeto React antigo enviava.
    const requestBody = {
      grant_type: "client_credentials",
    };

    // --- INÍCIO DOS LOGS PARA DEBUG: O QUE SERÁ ENVIADO PARA A API ---
    // Estes logs aparecerão no terminal onde o Next.js está rodando (porque a chamada é no servidor).
    console.log("--------------------------------------------------");
    console.log(
      "DEBUG [services/auth.ts]: Enviando requisição de LOGIN para a API de backend:"
    );
    console.log(`  URL Completa: ${api.defaults.baseURL}/auth`);
    console.log("  Método HTTP: POST");
    console.log("  Corpo da requisição (Payload JSON):", requestBody);
    console.log("  Cabeçalhos que serão enviados:", {
      "Content-Type": "application/json", // Garante que o backend interprete o JSON
      Authorization: `Basic ${basicAuthHeader}`, // O cabeçalho Basic Auth
      // Outros cabeçalhos padrão do Axios (Accept, User-Agent, etc.) também serão incluídos.
    });
    console.log("--------------------------------------------------");
    // --- FIM DOS LOGS DE DEBUG ---

    // 3. Faz a chamada POST para o endpoint de autenticação da sua API.
    // Passa o corpo da requisição e os cabeçalhos personalizados para esta chamada específica.
    const response = await api.post<AuthResponseModel>("/auth", requestBody, {
      headers: {
        "Content-Type": "application/json", // Garante que o tipo de conteúdo é JSON
        Authorization: `Basic ${basicAuthHeader}`, // Inclui o cabeçalho Basic Auth
      },
    });

    // Loga a resposta completa da API para depuração.
    console.log(
      "DEBUG [services/auth.ts]: Login bem-sucedido. Resposta COMPLETA da API:",
      response.data
    );

    // IMPORTANTE:
    // REMOVIDO o armazenamento de token/user no localStorage AQUI.
    // Isso porque esta função é executada no SERVIDOR Next.js (via NextAuth.js authorize callback).
    // O localStorage NÃO EXISTE no ambiente de servidor, causando o ReferenceError anterior.
    // O NextAuth.js (Auth.js) se encarrega de gerenciar a sessão e os cookies no lado do servidor.

    return response.data; // Retorna os dados completos obtidos da API para o NextAuth.js.
  } catch (error) {
    // Loga o erro detalhadamente antes de relançá-lo para depuração.
    console.error(
      "DEBUG [services/auth.ts]: Erro na chamada signIn para a API. Detalhes:",
      error
    );
    // Em caso de qualquer erro (de rede, de API, etc.), re-lança o erro.
    // Isso permite que o callback 'authorize' do NextAuth.js capture e trate esse erro,
    // podendo exibir uma mensagem adequada ao usuário ou registrar.
    throw error;
  }
};

/**
 * Realiza o logout do usuário.
 * Remove todos os dados de autenticação e de usuário que porventura estejam no localStorage.
 *
 * NOTA IMPORTANTE:
 * Com NextAuth.js (Auth.js), a função `signOut()` de "next-auth/react"
 * (chamada nos componentes do cliente, como Header, NavMenu, ButtonSignOut)
 * é a maneira CORRETA e RECOMENDADA de fazer logout. Ela lida com a invalidação da sessão
 * baseada em cookies no lado do servidor.
 * Esta função `signOut` em `services/auth.ts` serve principalmente como um auxiliar para
 * limpar o localStorage, caso você ainda armazene algo lá por motivos específicos,
 * ou para cenários onde o logout não é via NextAuth.js (o que não é o seu caso principal).
 */
export const signOut = (): void => {
  localStorage.removeItem(env.AUTH_KEY); // Limpa o token de acesso do localStorage
  localStorage.removeItem(env.AUTH_KEY + "_refresh"); // Limpa o refresh token do localStorage
  localStorage.removeItem(env.USER_KEY); // Limpa os dados do usuário do localStorage
  // Redirecionamento para a página de login geralmente é feito no componente React
  // após chamar a função `signOut` de "next-auth/react", usando `useRouter().push('/signin')`.
};

/**
 * Verifica se há um usuário autenticado no cliente via presença do token no localStorage.
 *
 * NOTA IMPORTANTE:
 * Com NextAuth.js (Auth.js), `useSession()` de "next-auth/react" é o MÉTODO PREFERENCIAL
 * para verificar a autenticação e obter os dados do usuário em componentes React (Client Components),
 * pois ele reflete o estado da sessão do NextAuth.js (que está nos cookies do servidor).
 * Esta função `isAuthenticated` em `services/auth.ts` é mais útil para validações rápidas
 * puramente client-side que não dependem do estado da sessão do NextAuth.js (ex: um script externo).
 * @returns {boolean} true se o token de autenticação estiver presente no localStorage, false caso contrário.
 */
export const isAuthenticated = (): boolean => {
  // Acessa localStorage, portanto, só pode ser chamada em ambiente de navegador (Client-side).
  return !!localStorage.getItem(env.AUTH_KEY);
};

/**
 * Obtém os dados do usuário atualmente logado do localStorage.
 * Os dados do usuário são armazenados como uma string JSON e são parseados de volta para um objeto AuthUser.
 *
 * NOTA IMPORTANTE:
 * Similar a 'isAuthenticated', com NextAuth.js (Auth.js),
 * `useSession().data.user` é o MÉTODO PREFERENCIAL para obter os dados do usuário em componentes React.
 * @returns {AuthUser | null} O objeto AuthUser parseado ou null se não houver dados válidos no localStorage.
 */
export const getCurrentUser = (): AuthUser | null => {
  // Acessa localStorage, portanto, só pode ser chamada em ambiente de navegador (Client-side).
  const userString = localStorage.getItem(env.USER_KEY);
  if (userString) {
    try {
      return JSON.parse(userString) as AuthUser;
    } catch (e) {
      console.error("Erro ao fazer parse do usuário do localStorage:", e);
      return null;
    }
  }
  return null;
};
