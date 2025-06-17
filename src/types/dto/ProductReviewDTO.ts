import { StatusType } from "../enums/StatusType";
import { UserDTO } from "./UserDTO";

export interface ProductReviewDTO {
  id: string; // UUID
  score: number;
  description: string;
  user: UserDTO;
  productId: string; // UUID
  status: StatusType;
  dateAt: string; // Date
}
