// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   if (code) {
//     const cookieStore = cookies();
//     const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
//     await supabase.auth.exchangeCodeForSession(code);
//   }
//   return NextResponse.redirect(requestUrl.origin);
// }

// export async function GET(request) {
//   // const requestUrl = new URL(request.url);
//   // const code = requestUrl.searchParams.get("code");
//   // const access_token = requestUrl.searchParams.get("access_token");
//   // console.log("code:", code);
//   // console.log("access_token:", access_token);
//   // const cookieStore = cookies();
//   // const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
//   const { searchParams } = new URL(request.url);
//   const token_hash = searchParams.get("token_hash");
//   const type = searchParams.get("type");
//   console.log("token_hash:", token_hash);
//   console.log("type:", type);
//   // if (token_hash) {
//   //   const { session, error } = await supabase.auth.exchangeCodeForSession(code);
//   //   if (session) {
//   //     supabase.auth.setAuth(session.access_token); // set the session token
//   //   } else {
//   //     console.error(error);
//   //   }
//   // } else {
//   //   console.log("not code");
//   //   const {
//   //     data: { user },
//   //   } = await supabase.auth.getUser();
//   //   let metadata = user?.user_metadata;
//   //   console.log("abcdefg", metadata);
//   // }
//   return NextResponse.redirect(searchParams.origin);
// }
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
      console.error(error);
    }
  } else {
    console.log("No code provided");
  }

  return NextResponse.redirect(requestUrl.origin);
}
