import { StatusType } from "../enums/StatusType";
import { CategoryProduct } from "./CategoryProduct";
import { User } from "./User";

export interface Category {
  id: string; // UUID
  name: string;
  image_url: string;
  createAt: string; // Date
  user: User;
  status: StatusType;
  categoryProducts: CategoryProduct[];
}
