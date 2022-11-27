export interface ICustomer {
  id: number;
  created_at: Date;
  firstname: string;
  lastname: string;
  user_id: string;
}

export type InsertCustomer = Pick<
  ICustomer,
  "firstname" | "lastname" | "user_id"
>;
