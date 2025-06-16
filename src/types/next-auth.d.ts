// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import { Role } from "@/types/model/User";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: Role;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role?: Role;
    image?: string | null;
  }
}
