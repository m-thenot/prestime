import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authenticatedRoutes = ["/account"];
const unauthenticatedRoutes = ["/login", "/sign-up"];

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    (!session &&
      authenticatedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
      )) ||
    (session &&
      unauthenticatedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
      ))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/login", "/sign-up", "/account/:path*"],
};
