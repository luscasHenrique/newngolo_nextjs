import { Corda } from "../enums/Corda";
import { Gender } from "../enums/Gender";
import { Graduation } from "../enums/Graduation";
import { UserType } from "../enums/UserType";
import { Address } from "../model/Address";

export interface UserDTO {
  id: string; // UUID
  name: string;
  type: UserType;
  cpf: string;
  email: string;
  gender: Gender;
  birthdate: string; // Date
  cellPhone: string;
  graduation: Graduation;
  password?: string;
  address: Address;
  mestreUUID?: string; // UUID
  nameMestre?: string;
  corda: Corda;
  nickname?: string;
  acceptedTerms: boolean;
  image?: string;
}
