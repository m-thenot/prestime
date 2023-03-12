import { IAddress } from "./address";
import { ICustomer } from "./customer";
import { ITaskProvider } from "./provider";
import { IService } from "./service";
import { ITask } from "./task";

export interface IBooking {
  service?: IService;
  address?: IAddress;
  appointmentDate?: string;
  task?: ITask;
  taskProvider?: ITaskProvider | null;
  comment?: string | null;
  customer?: ICustomer;
  duration?: number;
  paymentMethod?: any;
  weeklyRecurrence?: number;
}
