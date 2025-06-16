import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Skill } from "@/lib/models/Skill";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const deleted = await Skill.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
