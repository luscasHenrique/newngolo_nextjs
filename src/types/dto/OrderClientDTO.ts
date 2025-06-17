import { PaymentStatus } from "../enums/PaymentStatus";
import { DiscountCoupon } from "../model/DiscountCoupon";
import { User } from "../model/User";
import { OrderItemProductDTO } from "./OrderItemProductDTO";

export interface OrderClientDTO {
  id: string; // UUID
  client: User;
  orderDate: string; // Date
  paymentStatus: PaymentStatus;
  discountCoupon?: DiscountCoupon;
  amount: number;
  totalValue: number;
  cancelReason?: string;
  cancelRequestDate?: string; // Date
  cancelDate?: string; // Date
  reverseValue?: number;
  cancelUser?: User;
  sendEmail: boolean;
  sendPush: boolean;
  orderItems: OrderItemProductDTO[];
}
