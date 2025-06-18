import { Address } from './Address';

export interface UserBasic {
  mestre: string;
  name: string;
  nickname: string;
  cpf: string;
  gender: string;
  email: string;
  cellPhone: string;
  birthdate: string;
  graduation: string;
  corda: string;
  password: string;
  address: Address;
  acceptedTerms: boolean;
  image: string;
}

export interface EventBasic {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  address: Address;
  image: string;
  imageDetail: string;
  payment: string;
}

export interface PixBasic {
  image: string;
  numeroPix: string;
}
