import { IAddress } from "./address";
import { PaymentMethod } from "./booking";

export interface IAppointmentDB {
  id: number;
  created_at: number;
  provider?: number | null;
  customer: number;
  date: string;
  suggested_dates: string[];
  address: number;
}

export type IInsertAppointment = Pick<
  IAppointmentDB,
  "provider" | "customer" | "suggested_dates" | "address"
>;

export enum PaymentState {
  PENDING = "pending",
  PAID = "paid",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
}

export interface IPayment {
  id: number;
  created_at: string;
  updated_at: string;
  method: PaymentMethod;
  state: PaymentState;
}

export type IInsertPayment = Pick<IPayment, "method" | "state">;

export enum OrderState {
  PENDING = "pending",
  SUBMITED = "submited",
  ACCEPTED = "accepted",
  DONE = "done",
  CANCELED = "canceled",
}

export interface IOrderDB {
  id: number;
  created_at: string;
  updated_at: string;
  task: number;
  task_provider?: number;
  state: OrderState;
  payment: number;
  appointment: number;
  comment?: string;
}

export type IInsertOrder = Pick<
  IOrderDB,
  "task" | "task_provider" | "state" | "payment" | "appointment" | "comment"
>;

export interface INewOrder {
  task: number;
  taskProvider?: number;
  provider?: number | null;
  state: OrderState;
  payment: IInsertPayment;
  address: IAddress;
  comment?: string | null;
}
