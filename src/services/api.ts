// src/services/api.ts
import axios, { AxiosError, AxiosRequestHeaders } from "axios"; // Importa AxiosError e AxiosRequestHeaders.
import { env } from "../config/env";
// Não importamos notify aqui diretamente para evitar dependências cíclicas ou problemas de ambiente.
// O tratamento de erro no interceptor deve ser genérico ou focado em console.log.
// A notificação ao usuário final é feita nos componentes React.

const baseUrl = env.BASE_URL;
const prefixBaseUrl = env.API_PREFIX;

const api = axios.create({
  baseURL: `${baseUrl}${prefixBaseUrl}`,
  responseType: "json", // Define o tipo de resposta padrão.
  // headers: createHeader(), // Removido: Headers serão adicionados por interceptors ou explicitamente.
});

// Interceptor de Requisição: Adiciona Bearer Token para requisições AUTENTICADAS.
// Não adiciona para a rota '/auth' (login), pois o login usa Basic Auth ou envia credenciais no corpo.
api.interceptors.request.use((config) => {
  // O endpoint de login é '/auth'. Outras rotas podem começar com '/auth/' (ex: '/auth/profile').
  // Ajuste a condição se a sua rota de login não for exatamente '/auth'.
  if (!config.url?.startsWith("/auth")) {
    const authToken = localStorage.getItem(env.AUTH_KEY); // Obtém o token do localStorage.
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`; // Adiciona o Bearer Token.
    }
  }
  return config;
});

// Interceptor de Resposta: Tratamento global de erros da API.
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Tipa o erro como AxiosError.
    const { response } = error;

    if (response) {
      const { status, data } = response;
      // Tratar erros 5xx (erros internos do servidor)
      if (status >= 500 && status < 600) {
        console.error("Erro interno do servidor:", data || error.message);
        // notify.error('Erro interno, tente novamente mais tarde!'); // Notify é feito no componente
      }
      // Tratamento de erros 401 Unauthorized e 403 Forbidden.
      // Com NextAuth.js, o redirecionamento é geralmente tratado pelos callbacks ou pelo middleware.
      // Remover tokens do localStorage aqui é redundante se NextAuth.js já está gerenciando a sessão via cookies.
      if (status === 401 || status === 403) {
        console.warn(
          "Sessão expirada ou acesso negado:",
          data || error.message
        );
        // notify.info('Sessão expirada, faça login novamente!'); // Notify é feito no componente
        // A limpeza do localStorage que estava aqui é removida para deixar o NextAuth.js gerenciar a sessão.
      }
      // Outros erros da API com detalhes
      if (status !== 401 && status !== 403 && (data as any)?.errors?.length) {
        // Exemplo: erros de validação da API
        console.error("Erros da API:", (data as any).errors);
        // notify.error((data as any).errors.join('\n'));
      }
      if (data && (data as any).details && (data as any).details.length > 0) {
        let errors = "";
        (data as any).details.forEach((value: string) => {
          errors += `${value} \n`;
        });
        console.error("Detalhes do erro da API:", errors);
        // notify.error(errors);
      }
    } else if (error.request) {
      // A requisição foi feita mas nenhuma resposta foi recebida (ex: problema de rede)
      console.error(
        "Erro de rede: Nenhuma resposta recebida do servidor.",
        error.request
      );
      // notify.error('Erro de conexão com o servidor. Verifique sua internet.');
    } else {
      // Algo aconteceu na configuração da requisição que disparou um erro
      console.error("Erro desconhecido na requisição Axios:", error.message);
      // notify.error('Ocorreu um erro inesperado na comunicação com a API.');
    }

    // Sempre rejeita a Promise para que o código chamador (serviço ou componente) possa tratar o erro.
    return Promise.reject(error);
  }
);

export { api, AxiosError };
