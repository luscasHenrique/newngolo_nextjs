import { api } from "./api";
import { setItem } from "@/helpers/localStorage";
import { env } from "@/config/env";

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
    // Adicione aqui os campos adicionais conforme a resposta da API (ex: tipo, status, etc)
  };
}

export async function loginService(payload: AuthRequest): Promise<void> {
  try {
    const response = await api.post<AuthResponse>("/auth", payload);
    const { token, user } = response.data;

    setItem(env.AUTH_KEY, token);
    setItem(env.USER_KEY, user);
  } catch (error) {
    throw error; // propaga para quem chamou (ex: um hook ou formulário)
  }
}
