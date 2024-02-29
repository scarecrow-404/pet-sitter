import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  if (code) {
    const { session, error } = await supabase.auth.exchangeCodeForSession(code);
    if (session) {
      supabase.auth.setAuth(session.access_token);
    } else {
    }
  } else {
  }

  return NextResponse.redirect(requestUrl.origin);
}
