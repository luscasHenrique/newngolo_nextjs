import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"; // Ajuste conforme seu domínio

async function sendResetLink(email: string, link: string) {
  // Implemente com seu serviço real de e-mail!
  // Exemplo:
  // await sendEmail({ to: email, subject: "Redefina sua senha", text: `Acesse para redefinir: ${link}` });
  console.log(`(FAKE) Link de redefinição para ${email}: ${link}`);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user)
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );

  // Gera token seguro
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

  // Salva na tabela Verification
  await prisma.verification.create({
    data: {
      identifier: user.email,
      value: token,
      expiresAt,
    },
  });

  // Monta o link do frontend
  const link = `${FRONTEND_URL}/reset-password?token=${token}`;

  // Envia email (adapte para seu provedor real)
  await sendResetLink(user.email, link);

  return NextResponse.json({ ok: true });
}
