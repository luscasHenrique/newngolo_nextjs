// src/components/providers/AllProviders.tsx
"use client"; // Marca este arquivo e seus filhos como Client Component.

import { SessionProvider } from "next-auth/react"; // Importa SessionProvider
import { ToastProvider } from "./ToastProvider"; // Importa seu ToastProvider

export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Os provedores agora estão dentro deste Client Component.
    <SessionProvider>
      {/*
        Renderiza o ToastProvider como um componente standalone,
        e depois o 'children' que são os layouts/páginas da sua aplicação.
        Ambos estarão dentro do contexto do SessionProvider.
      */}
      <ToastProvider /> {/* Renderizado como componente standalone */}
      {children} {/* Renderiza os componentes filhos (layouts, páginas) */}
    </SessionProvider>
  );
}
