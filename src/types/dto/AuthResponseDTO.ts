import { AuthUserDTO } from "./AuthUserDTO";

export interface AuthResponseDTO {
  userAuth: AuthUserDTO;
  token: string;
  refreshToken: string;
}
