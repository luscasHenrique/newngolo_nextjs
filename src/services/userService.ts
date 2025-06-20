// src/services/userService.ts
// Este arquivo contém as funções para interagir com a API relacionadas aos usuários.

import { api } from "./api"; // Importa a instância do Axios que configuramos em src/services/api.ts
import { UserProfile } from "@/model/UserProfile"; // Importa a interface para o perfil completo do usuário.

/**
 * Obtém o perfil completo de um usuário da API.
 * Endpoint: GET /api/v1/user/{userId}.
 * Este endpoint é acessado APÓS o login e provavelmente requer um Bearer Token.
 *
 * @param userId O ID do usuário cujo perfil será buscado.
 * @returns Uma Promise que resolve com o objeto UserProfile completo.
 * @throws Lança um erro (AxiosError) se a requisição falhar (ex: 401 Unauthorized, 403 Forbidden, 500 Internal Server Error, erro de rede).
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    // --- INÍCIO DOS LOGS PARA DEBUG: O QUE SERÁ ENVIADO PARA A API ---
    // Estes logs aparecerão no terminal onde o Next.js está rodando (porque a chamada é no servidor, via NextAuth.js authorize, ou no cliente via useUserProfile).
    console.log("--------------------------------------------------");
    console.log(
      "DEBUG [userService.ts]: Tentando obter perfil completo do usuário:"
    );
    console.log(`  URL Completa: ${api.defaults.baseURL}/user/${userId}`); // Constrói a URL com o ID do usuário.
    console.log("  Método HTTP: GET");
    // Axios já configura o Content-Type e Accept globalmente.
    // O Authorization: Bearer token é adicionado pelo interceptor de requisição em src/services/api.ts
    // Se o Authorization header não aparecer aqui no log, o problema está no interceptor do Axios.
    console.log(
      "  Cabeçalhos esperados (via interceptor do Axios):",
      api.defaults.headers
    );
    console.log("--------------------------------------------------");
    // --- FIM DOS LOGS DE DEBUG ---

    // Faz a chamada GET para o endpoint de perfil do usuário.
    // Assumimos que o endpoint '/user/{userId}' retorna um ÚNICO objeto UserProfile.
    // Se sua API retornar um ARRAY de UserProfile (como o endpoint '/user/perfil' anterior),
    // você precisará ajustar o tipo e pegar o primeiro elemento:
    // const response = await api.get<UserProfile[]>(`/user/${userId}`);
    // return response.data[0];
    const response = await api.get<UserProfile>(`/user/${userId}`);

    console.log(
      "DEBUG [userService.ts]: Perfil completo recebido com sucesso:",
      response.data
    );
    return response.data; // Retorna o objeto UserProfile completo.
  } catch (error: any) {
    // Captura e loga quaisquer erros durante a busca do perfil.
    console.error(
      "DEBUG [userService.ts]: Erro ao obter perfil do usuário. Detalhes:",
      error.response?.status,
      error.response?.data || error.message,
      error
    );
    throw error; // Re-lança o erro para o componente/hook que chamou (useUserProfile).
  }
};
