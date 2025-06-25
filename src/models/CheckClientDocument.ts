import { Client } from './User';

export interface CheckClientDocument {
  client: Client;
  changePassword: boolean;
  checkConfirmationCode: boolean;
}
