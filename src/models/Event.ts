import { Address } from './Address';
import StatusType from './StatusType';

export interface Events {
  id: string;
  name: string;
  description: string;
  address?: Address;
  image: string;
  imageDetail: string;
  startDate: string; // Data no formato string
  endDate: string; // Data no formato string
  userId?: string; // Corrigir para string
  status: StatusType;
  value: string;
}
