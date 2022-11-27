import { ICategory } from "./category";
import { ICustomer, InsertCustomer } from "./customer";

export interface Database {
  public: {
    Tables: {
      category: {
        Row: ICategory;
        Insert: {};
        Update: {};
      };
      customer: {
        Row: ICustomer;
        Insert: InsertCustomer;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
