import supabaseServer from "@utils/supabase/supabase-server";

import { InsertCustomer } from "types/customer";

const CUSTOMER_TABLE = "customer";

export const createCustomer = async (customer: InsertCustomer) => {
  return await supabaseServer().from(CUSTOMER_TABLE).insert(customer);
};
