import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

const createClient = () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });

export default createClient;
