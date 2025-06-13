// src/types/models/User.ts
export enum Role {
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
  EDITOR = "EDITOR",
  SELLER = "SELLER",
  VIEWER = "VIEWER",
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  phone?: string | null;
  role?: Role;
  is_active: boolean;
  bio?: string | null;
  last_login?: string | null;
  createdAt: string;
  updatedAt: string;
}
