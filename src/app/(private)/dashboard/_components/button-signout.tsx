// src/app/(private)/dashboard/_components/button-signout.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// REMOVA ESTA LINHA: import { authClient } from "@/lib/auth-client"; // GARANTA QUE FOI REMOVIDA

// Importe a função signOut do NextAuth.js
import { signOut as nextAuthSignOut } from "next-auth/react"; // <-- AQUI ESTÁ A MUDANÇA
import { notify } from "@/lib/notify"; // Para notificações

export function ButtonSignOut() {
  const router = useRouter();

  async function signOut() {
    try {
      // CHAMA O SIGNOUT DO NEXTAUTH.JS
      await nextAuthSignOut({
        redirect: false, // Importante para controlar o redirecionamento manualmente
        // callbackUrl: "/signin", // Opcional: Define para onde ir se redirect: true
      });
      notify.success("Sessão encerrada com sucesso!");
      router.replace("/signin"); // Redireciona para a página de login após o logout
    } catch (error) {
      notify.error("Erro ao encerrar sessão. Por favor, tente novamente.");
      console.error("Erro ao realizar logout:", error);
    }
  }

  return <Button onClick={signOut}>Sair da conta</Button>;
}
