// src/config/env.ts

// Usamos process.env.NEXT_PUBLIC_... para variáveis de ambiente acessíveis no cliente.
// Os valores padrões são para desenvolvimento/fallback.

export const env = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", // Fallback URL
  API_PREFIX: process.env.NEXT_PUBLIC_SUFFIX_BASE_URL || "/api/v1", // Fallback prefix
  USER_KEY: process.env.NEXT_PUBLIC_USER || "@ngolo:user",
  AUTH_KEY: process.env.NEXT_PUBLIC_AUTH || "@ngolo:auth",
  IMAGE_BASE_URL:
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:3000/images/",
  PRODUCT_IMAGE_BASE_URL:
    process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL ||
    "http://localhost:3000/uploads/", // <-- ADICIONADO AQUI!
};
