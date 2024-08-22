import { Address } from "./Address";
import { Orders } from "./Orders";

export interface User{
    username: string
      email: string
      addresses: Address[];
      orders: Orders[]
}