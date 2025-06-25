// src/hooks/useCurrentUser.ts
"use client";

import { useSession } from "next-auth/react";
import { AuthUser } from "@/models/AuthUser";

/**
 * Hook para obter o usuário atualmente logado e o estado de carregamento da sessão do NextAuth.js.
 * @returns { user: AuthUser | null; loading: boolean } Retorna o objeto AuthUser ou null, e um estado de carregamento.
 */
export function useCurrentUser(): { user: AuthUser | null; loading: boolean } {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  // O tipo de session.user é estendido via next-auth.d.ts para ser AuthUser.
  const user: AuthUser | null = session?.user || null;

  return { user, loading };
}
