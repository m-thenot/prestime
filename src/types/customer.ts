export interface ICustomer {
  id: number;
  created_at: number;
  firstname: string;
  lastname: string;
  phone_number: string;
  user_id: string;
  financial_id: string;
}

export type InsertCustomer = Pick<
  ICustomer,
  "firstname" | "lastname" | "user_id" | "phone_number" | "financial_id"
>;

export type UpdateCustomer = { email: string } & Pick<
  ICustomer,
  "firstname" | "lastname" | "phone_number" | "user_id"
>;
