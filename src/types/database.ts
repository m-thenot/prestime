import { ICategory } from "./category";
import { ICustomer, InsertCustomer } from "./customer";
import { IService } from "./service";

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
      service: {
        Row: IService;
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
