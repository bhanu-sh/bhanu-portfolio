import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  (await cookieStore).set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return new Response(JSON.stringify({ success: true }));
}
