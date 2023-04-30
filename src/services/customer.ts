import supabase from "@utils/supabase/supabase-browser";
import { InsertCustomer, UpdateCustomer } from "types/customer";

const CUSTOMER_TABLE = "customer";

export const createCustomer = async (customer: InsertCustomer) => {
  return await supabase.from(CUSTOMER_TABLE).insert(customer);
};

export const updateCustomer = async (
  customer: UpdateCustomer,
  currentEmail?: string
) => {
  const { phone_number, firstname, lastname, user_id, email } = customer;

  if (email && currentEmail !== email) {
    supabase.auth.updateUser({ email: email });
  }

  return await supabase
    .from(CUSTOMER_TABLE)
    .update({ phone_number, lastname, firstname })
    .eq("user_id", user_id);
};

export const getCustomer = async () => {
  return await supabase.from(CUSTOMER_TABLE).select("*").limit(1).single();
};
