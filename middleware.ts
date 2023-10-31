import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserType } from "types/user";

const authenticatedRoutes = ["/account", "/pro/bookings"];
const authenticatedProRoutes = ["/pro/bookings"];
const authenticatedCustomerRoutes = ["/account/bookings"];
const unauthenticatedRoutes = ["/login", "/sign-up", "/pro/sign-up"];

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const type: UserType = session?.user.user_metadata.type;
  const pathname = req.nextUrl.pathname;

  if (
    (!session &&
      authenticatedRoutes.some((route) => pathname.startsWith(route))) ||
    (session &&
      unauthenticatedRoutes.some((route) => pathname.startsWith(route))) ||
    (session &&
      type === UserType.CUSTOMER &&
      authenticatedProRoutes.some((route) => pathname.startsWith(route))) ||
    (session &&
      type === UserType.PROVIDER &&
      authenticatedCustomerRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/account/information",
    "/account/bookings",
    "/pro/sign-up",
    "/pro/bookings",
  ],
};
