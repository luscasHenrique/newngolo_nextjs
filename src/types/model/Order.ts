import { PaymentStatus } from "../enums/PaymentStatus";
import { StatusType } from "../enums/StatusType";
import { User } from "./User";

export interface Order {
  id: string; // UUID
  userId: User;
  eventId?: Event;
  createdAt: string; // Date
  totalValue: string;
  isCoutesy: boolean;
  cancelReason?: string;
  cancelDate?: string; // Date
  status: StatusType;
  paymentStatus: PaymentStatus;
}
