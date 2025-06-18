// src/app/layout.tsx
// Este é o layout raiz e obrigatório do Next.js App Router.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importa o Client Component que contém todos os seus provedores.
import AllProviders from "@/components/providers/AllProviders"; // <--- NOVO IMPORT

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "N'GOLO Capoeira App",
  description: "Sistema para controle de grupo N'GOLO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Envolve 'children' com o Client Component 'AllProviders'. */}
        {/* 'AllProviders' por sua vez contém SessionProvider e ToastProvider. */}
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
