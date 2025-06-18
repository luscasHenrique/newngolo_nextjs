// src/model/AuthUser.ts
import { UserType } from "./UserType"; // Importa seu enum UserType

export interface AuthUser {
  id: string; // CORRIGIDO: Deve ser do tipo 'string', não o literal 'string'
  name: string; // CORRIGIDO: Deve ser do tipo 'string', não o literal 'string'
  email: string;
  imageUrl?: string; // CORRIGIDO: Deve ser do tipo 'string' ou undefined, não o literal 'string'
  type: UserType; // Ok, isso indica que o tipo deve ser um dos valores do seu enum UserType
}
