import { corsHeaders } from "../shared/cors.ts";
import { createErrorResponse, createJsonResponse } from "../shared/response.ts";

import * as postgres from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const databaseUrl = Deno.env.get("SUPABASE_DB_URL")!;

const pool = new postgres.Pool(databaseUrl, 3, true);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();
    const connection = await pool.connect();

    try {
      await connection.queryObject`UPDATE "order" SET provider = null WHERE id = ${orderId}`;

      return new Response("ok", { headers: corsHeaders });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return createErrorResponse(error.message, 500);
  }
});
