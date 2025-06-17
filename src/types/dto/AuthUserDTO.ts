import { UserType } from "../enums/UserType";

export interface AuthUserDTO {
  id: string; // UUID
  name: string;
  imageUrl?: string;
  type: UserType;
}
