import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin");

  if (!token) {
    if (isLoginPage) return NextResponse.next();
    if (isAdminPage) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.role !== "admin") {
      throw new Error("Unauthorized");
    }

    if (isLoginPage) {
      return NextResponse.redirect(new URL("/admin/projects", req.url));
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
}
