import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function PATCH(
  request: NextRequest,
  context: any // Use 'any' para garantir compatibilidade
) {
  // Se context for Promise, aguarde. Senão, use direto.
  const ctx = typeof context.then === "function" ? await context : context;
  const { id } = ctx.params;
  const { password } = await request.json();

  if (!password || password.length < 6) {
    return NextResponse.json(
      { error: "A senha deve ter pelo menos 6 caracteres." },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 10);

  // Procura usuário
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado." },
      { status: 404 }
    );
  }

  // Procura account do tipo credentials
  const account = await prisma.account.findFirst({
    where: { userId: id, providerId: "credentials" },
  });

  if (account) {
    await prisma.account.update({
      where: { id: account.id },
      data: { password: hashedPassword },
    });
  } else {
    await prisma.account.create({
      data: {
        userId: id,
        providerId: "credentials",
        accountId: user.email,
        password: hashedPassword,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
