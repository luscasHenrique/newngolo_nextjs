export interface Address {
  id: string;
  zipcode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  complement: string;
  number: string;
  latitude?: number;
  longitude?: number;
  country: string;
}
