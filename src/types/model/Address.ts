export interface Address {
  id: string; // UUID
  zipcode: string;
  country: string;
  state: string;
  city: string;
  district: string;
  street: string;
  complement?: string;
  number: string;
}
