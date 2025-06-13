// src/app/(private)/layout.tsx
import { auth } from "@/lib/auth"; // Importando o auth para verificar a sessão
import { headers } from "next/headers"; // Para pegar os cabeçalhos da requisição
import { redirect } from "next/navigation"; // Para redirecionar para outra página

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NavMenu } from "./_components/navmenu/NavMenu";
import { Header } from "./_components/header/Header";
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
  title: "Área Privada | Base System",
  description: "Layout exclusivo para rotas privadas",
};

export default async function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Verificar se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // Caso não tenha sessão (usuário não autenticado), redirecionar para a página pública (login)
    redirect("/"); // ou para qualquer outra página pública
  }

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen overflow-hidden bg-white">
          {/* Sidebar com menu de navegação */}
          <div className="hidden md:flex p-1">
            <NavMenu />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 flex flex-col">
            {/* Cabeçalho */}
            <Header />

            {/* Conteúdo da página */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
