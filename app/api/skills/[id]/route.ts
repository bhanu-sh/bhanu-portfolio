import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Skill } from "@/lib/models/Skill";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Skill.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
