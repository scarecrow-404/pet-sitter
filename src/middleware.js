import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user && req.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  // if (!user) {
  //   const parts = req.nextUrl.pathname.split("/");
  //   if (parts.length === 3 && parts[1] === "search" && parts[2]) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }
  // if (!user && req.nextUrl.pathname === "/search/") {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return res;
}
