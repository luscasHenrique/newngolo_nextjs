// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs"; // Use bcryptjs para hash seguro de senha

// GET - Listar todos os usuários
export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return NextResponse.json(users);
}

// POST - Criar usuário
export async function POST(request: NextRequest) {
  const { name, email, password, role } = await request.json();
  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      role,
      accounts: {
        create: [
          {
            providerId: "credentials",
            accountId: email,
            password: hashedPassword,
          },
        ],
      },
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
