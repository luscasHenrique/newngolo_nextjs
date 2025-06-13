// src>app>api>users>[id]>route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Precisa do await!
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
}

// PATCH /api/users/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Precisa do await!
  const { name, role } = await request.json();

  if (!name || !role) {
    return NextResponse.json(
      { error: "Nome e cargo obrigatórios" },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id },
    data: { name, role },
  });

  return NextResponse.json(user);
}

// DELETE /api/users/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Precisa do await!
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
