import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/database";

const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export const createServiceClient = () => {
  return createServerComponentSupabaseClient<Database>({
    headers,
    cookies: () => ({
      get: () => null,
    }),
    supabaseKey: process.env.SUPABASE_SERVICE_KEY,
  });
};

export default createClient;
