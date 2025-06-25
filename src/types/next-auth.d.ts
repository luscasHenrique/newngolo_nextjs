// src/types/next-auth.d.ts
// Este arquivo estende as interfaces padrão do NextAuth.js para incluir suas propriedades personalizadas.
// Ele deve ser reconhecido automaticamente pelo TypeScript se estiver na pasta 'src/types/'.

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { AuthUser } from "@/models/AuthUser"; // Importa sua interface AuthUser.

declare module "next-auth" {
  /**
   * Estende a interface 'Session' padrão do NextAuth.js.
   * Isso é o que você obtém ao usar `useSession()` ou `getSession()`.
   */
  interface Session {
    accessToken?: string; // Seu token de acesso da API
    refreshToken?: string; // Seu refresh token da API
    user: AuthUser; // O objeto do usuário na sessão, usando seu AuthUser customizado.
    // AuthUser deve ter 'id', 'name', 'email', 'image' (ou imageUrl para mapeamento)
    // pois são esperados pelo NextAuth.js no 'user' da sessão.
  }

  /**
   * Estende a interface 'User' padrão do NextAuth.js.
   * Isso é o que você retorna do callback `authorize` do CredentialsProvider.
   * Ele deve incluir as propriedades padrão e suas personalizadas.
   */
  interface User extends AuthUser {
    // Extende seu AuthUser aqui.
    id: string; // NextAuth.js exige 'id' na interface 'User' retornada por 'authorize'.
    accessToken?: string; // Propriedade personalizada para o token de acesso.
    refreshToken?: string; // Propriedade personalizada para o refresh token.
    image?: string; // Propriedade 'image' padrão do NextAuth.js para avatar.
    // Sua API tem 'imageUrl', que será mapeado para 'image'.
  }
}

declare module "next-auth/jwt" {
  /**
   * Estende a interface 'JWT' padrão do NextAuth.js.
   * Isso é o token JWT que é armazenado no cookie (lado do servidor).
   * Ele conterá as informações que você adiciona no callback 'jwt'.
   */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: AuthUser; // Armazena o objeto AuthUser completo dentro do token JWT.
  }
}
