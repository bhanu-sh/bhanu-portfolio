import { connectDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/Project";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectDB();
  await Project.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
