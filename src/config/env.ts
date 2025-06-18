// src/config/env.ts

// Usamos process.env.NEXT_PUBLIC_... para variáveis de ambiente acessíveis no cliente.
// Os valores padrões são para desenvolvimento/fallback.

export const env = {
  // Base URL da sua API (ex: https://api.ngolocapoeira.org)
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://api.ngolocapoeira.org",

  // Prefixo da API (ex: /api/v1)
  API_PREFIX: process.env.NEXT_PUBLIC_SUFFIX_BASE_URL || "/api/v1",

  // Chaves para localStorage (ou cookies, se for usar middleware)
  USER_KEY: process.env.NEXT_PUBLIC_USER || "@ngolo:user", // Chave para armazenar dados do usuário
  AUTH_KEY: process.env.NEXT_PUBLIC_AUTH || "@ngolo:auth", // Chave para armazenar o token de autenticação
};
