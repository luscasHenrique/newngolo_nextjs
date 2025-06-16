// src/app/(account)/layout.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ToastProvider } from "@/components/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minha Conta | Sua Loja",
  description: "Gerencie suas informações, pedidos e perfil.",
};

export default async function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 1. Verificação de Autenticação (igual ao seu layout privado)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // Se não estiver logado, redireciona para a home ou página de login.
    redirect("/");
  }

  // AQUI VOCÊ PODE ADICIONAR UMA LÓGICA NO FUTURO PARA REDIRECIONAR ADMINS
  // if (session.user.role === 'admin') {
  //   redirect('/dashboard'); // Ex: Redireciona admin para o dashboard dele
  // }

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen overflow-hidden bg-muted/40">
          {/* Menu lateral específico do usuário */}

          {/* Conteúdo principal da conta do usuário */}
          <div className="flex-1 flex flex-col">
            {/* Cabeçalho específico do usuário */}

            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
