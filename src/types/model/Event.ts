import { PaymentType } from "../enums/PaymentType";
import { StatusType } from "../enums/StatusType";
import { Address } from "./Address";
import { User } from "./User";

export interface Event {
  id: string; // UUID
  name: string;
  description: string;
  address: Address;
  image: string;
  imageDetail: string;
  startDate: string; // Date
  endDate: string; // Date
  createdAt: string; // Date
  userId: User;
  status: StatusType;
  paymentType: PaymentType;
  inscription: boolean;
  value: string;
}
