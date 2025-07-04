// src/app/(public)/layout.tsx
// Este é um layout ANINHADO, específico para rotas dentro da pasta (public).

// REMOVA: import type { Metadata } from "next"; // Metadata é definida APENAS no layout raiz.
// REMOVA: imports de fontes aqui (Geist, Geist_Mono). As fontes são carregadas no layout raiz.
// REMOVA: import "../globals.css"; // CSS global é importado no layout raiz.
// REMOVA: import { ToastProvider } from "@/components/providers/ToastProvider"; // ToastProvider agora está no layout raiz.

import { Footer } from "./_components/footer/Footer";
import { HeaderMenu } from "./_components/headerMenu/HeaderMenu"; // Seu componente de cabeçalho público.

// NÃO DEFINA FONTES AQUI:
// const geistSans = Geist({...});
// const geistMono = Geist_Mono({...});

// NÃO DEFINA metadata AQUI:
// export const metadata: Metadata = {...};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderMenu /> {/* Componente de cabeçalho para a área pública */}
      <div className="space-y-10 my-10 max-w-7xl mx-auto px-4">
        {children} {/* Páginas públicas (ex: /signin, /signup) */}
      </div>
      <Footer />
    </>
  );
}
