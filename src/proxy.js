import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Optimistic gate for /admin. Every admin page and server action also calls
// requireAdmin() (src/lib/auth.js), so this is not the only line of defence.
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.AUTH_SECRET;

  if (token && secret && secret.length >= 32) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
        algorithms: ["HS256"],
      });
      if (payload.role === "admin") return NextResponse.next();
    } catch {
      /* fall through to redirect */
    }
  }

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
