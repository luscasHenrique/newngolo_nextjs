// src/lib/auth.ts
// Este arquivo é um wrapper para getServerSession do NextAuth.js.
// Ele é usado em Server Components (como layouts e pages do lado do servidor)
// para obter a sessão do usuário.

import { getServerSession } from "next-auth";

// Exportamos um objeto 'auth' com uma propriedade 'api' que contém 'getSession'.
// Isso imita a estrutura que seu PrivateLayout original esperava.
export const auth = {
  api: {
    getSession: async () => {
      // getServerSession() obtém a sessão da requisição atual no servidor.
      // Ele lê o cookie de sessão do NextAuth.js.
      return await getServerSession();
    },
  },
};
