// src/lib/getCurrentUser.ts
import { auth } from "@/lib/auth";
import { Role, User } from "@/types/model/User";
import { headers } from "next/headers";

export async function getCurrentUser(): Promise<User | null> {
  const rawHeaders = await headers();
  const session = await auth.api.getSession({ headers: rawHeaders });

  if (!session?.user) return null;

  const user = session.user;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image ?? null,
    phone: user.phone ?? null,
    role: user.role as Role,
    is_active: user.is_active ?? true,
    bio: user.bio ?? null,
    last_login: user.last_login
      ? new Date(user.last_login).toISOString()
      : null,
    createdAt: new Date(user.createdAt).toISOString(),
    updatedAt: new Date(user.updatedAt).toISOString(),
  };
}
