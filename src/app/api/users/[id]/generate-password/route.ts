import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

// Ajuste para seu próprio serviço real de e-mail
async function sendGeneratedPassword(email: string, newPassword: string) {
  // Implemente com seu serviço de email real (Nodemailer, Resend etc.)
  // Exemplo:
  // await sendEmail({ to: email, subject: "Sua nova senha", text: `Sua nova senha é: ${newPassword}` });
  console.log(`(FAKE) Nova senha para ${email}: ${newPassword}`);
}

function generatePassword(length = 10) {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%";
  let pass = "";
  for (let i = 0; i < length; i++)
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  return pass;
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

  const newPassword = generatePassword();
  const hashed = await hash(newPassword, 10);

  // Atualiza senha na conta
  await prisma.account.updateMany({
    where: { userId: id, providerId: "credentials" },
    data: { password: hashed },
  });

  // Envia para o email (substitua pelo seu sistema real)
  await sendGeneratedPassword(user.email, newPassword);

  return NextResponse.json({ ok: true });
}
