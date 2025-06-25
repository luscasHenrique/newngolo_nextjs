// src/model/AuthUser.ts
import { UserType } from "./UserType"; // Importa seu enum UserType

export interface AuthUser {
  refreshToken: string | undefined;
  accessToken: string | undefined;
  id: string; // CORRIGIDO: Deve ser do tipo 'string', não o literal 'string'
  name: string; // CORRIGIDO: Deve ser do tipo 'string', não o literal 'string'
  email: string;
  imageUrl?: string;
  image?: string;
  type: UserType; // Ok, isso indica que o tipo deve ser um dos valores do seu enum UserType
}
