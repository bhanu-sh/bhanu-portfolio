import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log("Login attempt:", { username, password });

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return new Response(JSON.stringify({ success: true }));
}
