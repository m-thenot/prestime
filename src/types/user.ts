import { ICustomer } from "./customer";
import { IProvider } from "./provider";

interface ICustomerUser extends ICustomer {
  email: string;
  type: UserType;
}

interface IProviderUser extends IProvider {
  email: string;
  type: UserType;
}

export type IUser = ICustomerUser | IProviderUser;

export enum UserType {
  CUSTOMER = "customer",
  PROVIDER = "provider",
}
