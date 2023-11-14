import { corsHeaders } from "./cors.ts";

export const createErrorResponse = (message: string, status: number) => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};

export const createJsonResponse = (data: any) => {
  const body = JSON.stringify(
    data,
    (key, value) => (typeof value === "bigint" ? value.toString() : value),
    2
  );
  return new Response(body, {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};
