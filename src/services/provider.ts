import supabase from "@utils/supabase/supabase-browser";
import { IInsertProvider } from "types/provider";

const PROVIDER_TABLE = "provider";

export const createProvider = async (provider: IInsertProvider) => {
  return await supabase.from(PROVIDER_TABLE).insert(provider);
};

export const getProvider = async () => {
  return await supabase.from(PROVIDER_TABLE).select("*").limit(1).single();
};
