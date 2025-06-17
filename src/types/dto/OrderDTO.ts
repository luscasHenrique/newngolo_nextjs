import { PaymentStatus } from "../enums/PaymentStatus";
import { StatusType } from "../enums/StatusType";

export interface OrderDTO {
  id: string; // UUID
  userId: string; // UUID
  eventId?: string; // UUID
  createdAt: string; // Date
  totalValue: string;
  isCoutesy: boolean;
  cancelReason?: string;
  cancelDate?: string; // Date
  cancelUserId?: string; // UUID
  status: StatusType;
  paymentStatus: PaymentStatus;
}
