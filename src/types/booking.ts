import { IAddress } from "./address";
import { ICustomer } from "./customer";
import { IService } from "./service";
import { ITask } from "./task";

export interface IBooking {
  service?: IService;
  address?: IAddress;
  appointmentDate?: string;
  cartContent?: ITask;
  comment?: string;
  customer?: ICustomer;
  duration?: number;
  paymentMethod?: any;
  weeklyRecurrence?: number;
}
