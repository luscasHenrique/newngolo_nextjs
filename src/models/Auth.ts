// src/model/Auth.ts
import { AuthUser } from "./AuthUser";

// Interface para a RESPOSTA da API de login
export interface Auth {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

// Interface para o PAYLOAD (dados que você envia) da requisição de login
// Esta interface é necessária para a função signIn em src/services/auth.ts
export interface AuthPayload {
  email: string;
  password: string;
  grant_type?: "client_credentials";
}
