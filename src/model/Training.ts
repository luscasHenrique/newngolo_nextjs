import { Client } from './User';
import StatusType from './StatusType';
import { TrainingType } from './TrainingType';
import { Address } from './Address';

export interface Training {
  id: string;
  type: TrainingType;
  name: string;
  status: StatusType;
  address?: Address;
  user?: Client;
}
