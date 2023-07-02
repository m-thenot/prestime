import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/database";

const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export const createServiceClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
    supabaseKey: process.env.SUPABASE_SERVICE_KEY,
  });

export default createClient;
