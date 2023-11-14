import supabase from "@utils/supabase/supabase-browser";

const PROVIDER_TABLE = "provider";

export const getProvider = async () => {
  return await supabase.from(PROVIDER_TABLE).select("*").limit(1).single();
};
