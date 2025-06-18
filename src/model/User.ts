import { update } from 'ramda';
import { Address } from './Address';
import CardClient from './CardClient';
import Gender from './Gender';

export interface Client {
  id: string;
  name: string;
  nickname: string;
  cpf: string;
  rg: string;
  cellPhone: string;
  telephone: string;
  email: string;
  gender: Gender;
  birthDate: string;
  motherName: string;
  imageBase64?: string;
  image?: string;
  address?: Address;
  cards?: CardClient[];
  checkData?: boolean;
  data?: string;
  mestre: string;
  nameMestre: string;
  corda: string;
}

export interface UpdateClient {
  name: string;
  nickname: string;
  cellPhone: string;
  mestre: string;
}
