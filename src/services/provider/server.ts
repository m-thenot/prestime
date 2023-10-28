import supabase, { createServiceClient } from "@utils/supabase/supabase-server";
import { IInsertProvider } from "types/provider";

const PROVIDER_TABLE = "provider";

export const createProvider = async (provider: IInsertProvider) => {
  return await supabase().from(PROVIDER_TABLE).insert(provider);
};
