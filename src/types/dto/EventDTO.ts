import { PaymentType } from "../enums/PaymentType";
import { StatusType } from "../enums/StatusType";
import { Address } from "../model/Address";

export interface EventDTO {
  id: string; // UUID
  name: string;
  description: string;
  address: Address;
  image: string;
  imageDetail: string;
  startDate: string; // Date
  endDate: string; // Date
  userId: string; // UUID
  status: StatusType;
  inscription: boolean;
  value: string;
  paymentType: PaymentType;
}
