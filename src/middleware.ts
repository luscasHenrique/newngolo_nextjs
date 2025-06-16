import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { canAccess } from "@/lib/accessControl";
import { Role } from "./types/model/User";

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  const role = (session?.user as { role?: Role })?.role;

  const pathname = req.nextUrl.pathname;

  const isPrivatePath = pathname.startsWith("/private");

  // Bloqueia se for rota privada e sem login
  if (isPrivatePath && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Bloqueia se não tiver permissão para a rota
  if (isPrivatePath && !canAccess(pathname, role)) {
    return NextResponse.redirect(new URL("/403", req.url)); // página de acesso negado
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*"], // Ajuste conforme suas rotas privadas
};
