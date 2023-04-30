export interface ICustomer {
  id: number;
  created_at: Date;
  firstname: string;
  lastname: string;
  phone_number: string;
  user_id: string;
  email: string;
}

export type InsertCustomer = Pick<
  ICustomer,
  "firstname" | "lastname" | "user_id" | "phone_number"
>;

export type UpdateCustomer = { email: string } & Pick<
  ICustomer,
  "firstname" | "lastname" | "phone_number" | "user_id"
>;
