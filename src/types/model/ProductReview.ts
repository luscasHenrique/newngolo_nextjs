import { StatusType } from "../enums/StatusType";
import { Product } from "./Product";
import { User } from "./User";

export interface ProductReview {
  id: string; // UUID
  score: number;
  description: string;
  user: User;
  product: Product;
  status: StatusType;
  dateAt: string; // Date
}
