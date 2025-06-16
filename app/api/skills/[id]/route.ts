import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Skill } from "@/lib/models/Skill";

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectDB();
  await Skill.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
