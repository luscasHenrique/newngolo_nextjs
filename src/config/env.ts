// src/config/env.ts
export const env = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://api.ngolocapoeira.org",
  API_PREFIX: process.env.NEXT_PUBLIC_SUFFIX_BASE_URL || "/api/v1/",
  USER_KEY: process.env.NEXT_PUBLIC_USER || "@ngolo:user",
  AUTH_KEY: process.env.NEXT_PUBLIC_AUTH || "@ngolo:auth",
};
