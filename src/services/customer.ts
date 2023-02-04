import supabase from "@utils/supabase/supabase-browser";
import { InsertCustomer } from "types/customer";

const CUSTOMER_TABLE = "customer";

export const createCustomer = async (customer: InsertCustomer) => {
  return await supabase.from(CUSTOMER_TABLE).insert(customer);
};

export const getCustomer = async () => {
  return await supabase.from(CUSTOMER_TABLE).select("*").limit(1).single();
};
