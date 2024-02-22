import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  // Your middleware logic here

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: function (name) {
          return request.cookies.get(name)?.value;
        },
        set: function (name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: function (name, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  let response = NextResponse.next();

  return response;
}
