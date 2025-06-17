import { StatusType } from "../enums/StatusType";
import { Product } from "./Product";

export interface Ratings {
  id: string; // UUID
  averageRating: string;
  count: string;
  dateAt: string; // Date
  updateAt: string; // Date
  status: StatusType;
  product: Product;
}
