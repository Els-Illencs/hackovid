import { UserAddress } from "./UserAddress";

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  address: UserAddress;
  phone: string;
}
