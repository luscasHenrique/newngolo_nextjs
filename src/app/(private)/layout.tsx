// src/app/(private)/layout.tsx
// Este é um layout ANINHADO, específico para rotas dentro da pasta (private).
// Ele é um Server Component por padrão.
// Ele verifica a sessão do usuário no lado do servidor para proteger as rotas.

import { auth } from "@/lib/auth"; // Importa o utilitário 'auth' para getServerSession.
import { headers } from "next/headers"; // Necessário para getServerSession (contexto da requisição).
import { redirect } from "next/navigation"; // Para redirecionar.

// REMOVA: import type { Metadata } from "next"; // Metadata é definida APENAS no layout raiz.
// REMOVA: imports de fontes aqui (Geist, Geist_Mono). As fontes são carregadas no layout raiz.
// REMOVA: import "../globals.css"; // CSS global é importado no layout raiz.
// REMOVA: import { ToastProvider } from "@/components/providers/ToastProvider"; // ToastProvider agora está no layout raiz.

import { NavMenu } from "./_components/navmenu/NavMenu"; // Seu componente NavMenu.
import { Header } from "./_components/header/Header"; // Seu componente Header.

// NÃO DEFINA FONTES AQUI:
// const geistSans = Geist({...});
// const geistMono = Geist_Mono({...});

// NÃO DEFINA metadata AQUI:
// export const metadata: Metadata = {...};

export default async function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Obtém a sessão do usuário do lado do servidor usando getServerSession via seu 'auth' utilitário.
  const session = await auth.api.getSession();

  // Se não houver sessão ou o usuário na sessão for nulo, redireciona para a página de login.
  if (!session || !session.user) {
    redirect("/signin");
  }

  return (
    // REMOVIDO: <html lang="pt-BR"> e <body>. O layout raiz já os fornece.
    // Retorna APENAS o conteúdo da div principal deste layout.
    <>
      <div className="flex h-screen overflow-hidden bg-white">
        <div className="hidden md:flex p-1">
          <NavMenu /> {/* Componente de navegação para a área privada */}
        </div>

        <div className="flex-1 flex flex-col">
          <Header /> {/* Cabeçalho da área privada */}
          <main className="flex-1 overflow-auto p-6">{children}</main>{" "}
          {/* Conteúdo da rota privada */}
        </div>
      </div>
      {/* REMOVIDO: <ToastProvider /> */}
    </>
  );
}
