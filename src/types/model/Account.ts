import { User } from "./User";

// src/types/models/Account.ts
export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  user?: User;
  password?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: string | null;
  refreshTokenExpiresAt?: string | null;
  scope?: string | null;
  createdAt: string;
  updatedAt: string;
}
