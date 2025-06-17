import { StatusType } from "../enums/StatusType";
import { PriceProductDTO } from "./PriceProductDTO";

export interface GradeSizeDTO {
  id: string; // UUID
  size: string;
  stock: string;
  status: StatusType;
  price: PriceProductDTO;
}
