// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   await supabase.auth.getSession();

//   return res;
// }

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // เรียกฟังก์ชัน getSession เพื่อตรวจสอบสถานะการเข้าสู่ระบบ
  const session = await supabase.auth.getSession();

  // เช็คว่ามี session หรือไม่ ถ้าไม่มีให้ redirect ไปยังหน้า login
  if (!session && !isAllowedPath(req.url)) {
    return res.redirect("/login");
  }

  return res;
}

// เช็คว่าเป็น path ที่อนุญาตให้เข้าถึงโดยไม่ต้องล็อกอินหรือไม่
function isAllowedPath(url) {
  const allowedPaths = ["/", "/search"]; // รายการ path ที่อนุญาต
  return allowedPaths.includes(allowedPaths);
}
