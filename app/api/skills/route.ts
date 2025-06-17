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

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Skill ID is required" },
      { status: 400 }
    );
  }

  const deletedSkill = await Skill.findByIdAndDelete(id);

  if (!deletedSkill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Skill deleted successfully" });
}
