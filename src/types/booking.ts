import { IAddress } from "./address";
import { ICustomer } from "./customer";
import { OrderState } from "./order";
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
  duration?: number;
  paymentMethod?: any;
  weeklyRecurrence?: number;
}

export enum BOOKING_STEPS {
  TASK = "",
  DESCRIPTION = "description",
  PROVIDERS = "providers",
  SCHEDULE = "schedule",
  ADDRESS = "address",
  PAYMENT = "payment",
  CONFIRMATION = "confirmation",
}

export enum PaymentMethod {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
}

export interface IBookingCard {
  id: number;
  created_at: Date;
  state: OrderState;
  task_provider?: {
    provider: {
      firstname: string;
    };
  } | null;
  task: {
    name: string;
    service: {
      title: string;
      image: string;
    };
  };
  appointment: {
    id: number;
    date: string | null;
    suggested_dates: string[];
    address: {
      formatted_address: string;
    };
  };
  customer: {
    firstname: string;
    lastname: string;
    phone_number: string;
  };
}

export interface IUserBooking {
  id: number;
  created_at: Date;
  state: OrderState;
  task_provider?: {
    price: number;
    provider: {
      firstname: string;
      description: string;
      phone_number: string;
      reviews?: {
        id: number;
        rating: number;
      }[];
    };
  } | null;
  task: {
    name: string;
    recommended_price: number;
    service: {
      title: string;
      image: string;
    };
  };
  comment: string;
  payment: {
    method: PaymentMethod;
  };
  appointment: {
    date: string | null;
    suggested_dates: string[];
    address: {
      formatted_address: string;
      latitude: number;
      longitude: number;
      country: string;
      city: string;
    };
  };
  customer: {
    firstname: string;
    lastname: string;
    phone_number: string;
  };
}
