import { DiscountType } from "../enums/DiscountType";
import { StatusType } from "../enums/StatusType";

export interface DiscountCoupon {
  id: string; // UUID
  name: string;
  code: string;
  amount: number;
  discountType: DiscountType;
  discount: number;
  amountSold: number;
  status: StatusType;
}
