import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/lib/models/Skill";

export async function GET() {
  await connectDB();
  const skills = await Skill.find();
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const skill = await Skill.create(body);
  return NextResponse.json(skill);
}
