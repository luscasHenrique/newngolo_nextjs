import { Corda } from "../enums/Corda";
import { Gender } from "../enums/Gender";
import { Graduation } from "../enums/Graduation";
import { UserStatus } from "../enums/UserStatus";
import { UserType } from "../enums/UserType";
import { Address } from "./Address";
import { Anamnesis } from "./Anamnesis";

export interface User {
  id: string; // UUID
  name: string;
  type: UserType;
  cpf: string;
  email: string;
  gender: Gender;
  birthdate: string; // Date
  cellPhone: string;
  graduation: Graduation;
  password?: string; // Geralmente não exposto
  address?: Address;
  acceptedTerms: boolean;
  image?: string;
  createdAt: string; // Date
  updateAt: string; // Date
  ipCreation: string;
  ipMachine: string;
  deviceId: string;
  status: UserStatus;
  corda: Corda;
  nickname?: string;
  isAnamnesis: boolean;
  anamnesis?: Anamnesis;
}
