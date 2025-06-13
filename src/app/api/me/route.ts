// src/app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Recupera a sessão do usuário autenticado
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user?.email) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Busca o usuário completo no banco, sem mais accounts!
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      // Se quiser pode incluir outros campos
    },
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 404 });
  }

  return NextResponse.json({ user });
}
