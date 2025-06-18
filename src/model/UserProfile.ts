// src/model/UserProfile.ts
import { Address } from "./Address";
import CardClient from "./CardClient";
import { Corda } from "./Corda";
import Gender from "./Gender";
import { Graduation } from "./Graduation";
import { UserType } from "./UserType";

// Esta interface representa o OBJETO COMPLETO do usuário
// retornado pelo endpoint GET /api/v1/user/perfil
export interface UserProfile {
  id: string;
  name: string;
  nickname?: string; // Opcional, se nem sempre tiver
  cpf?: string; // Opcional
  rg?: string; // Opcional
  cellPhone?: string;
  telephone?: string; // Opcional
  email: string; // CONFIRMADO: Email está aqui e é obrigatório no perfil completo
  gender?: Gender; // Enum Gender
  birthDate?: string; // Formato de data "AAAA-MM-DD"
  motherName?: string; // Opcional
  imageBase64?: string; // Opcional
  image?: string; // Opcional (URL ou caminho para imagem)
  imageUrl?: string;
  address?: Address; // Objeto de endereço
  cards?: CardClient[]; // Se você precisar de cards no perfil completo
  checkData?: boolean; // Opcional
  data?: string; // Opcional
  mestre?: string; // ID do mestre
  nameMestre?: string; // Nome do mestre
  corda?: Corda; // Enum Corda
  type: UserType; // Enum UserType (TEACHER, STUDENT, MASTER) - Adicionado da API doc
  graduation?: Graduation; // Enum Graduation - Adicionado da API doc
  acceptedTerms?: boolean; // Adicionado da API doc
}
