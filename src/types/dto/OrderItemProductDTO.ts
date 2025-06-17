import { StatusType } from "../enums/StatusType";
import { Product } from "../model/Product";
import { User } from "../model/User";

export interface OrderItemProductDTO {
  id: string; // UUID
  unitValue: number;
  totalValue: number;
  product: Product;
  itemName: string;
  statusType: StatusType;
  cancelDate?: string; // Date
  cancelUser?: User;
  syncDate?: string; // Date
}
