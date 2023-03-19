import { IAddress } from "./address";
import { ICustomer } from "./customer";
import { ITaskProvider } from "./provider";
import { ISchedule } from "./schedule";
import { IService } from "./service";
import { ITask } from "./task";

export interface IBooking {
  service?: IService;
  address?: IAddress;
  schedules?: ISchedule[];
  task?: ITask;
  taskProvider?: ITaskProvider | null;
  comment?: string | null;
  customer?: ICustomer;
  duration?: number;
  paymentMethod?: any;
  weeklyRecurrence?: number;
}
