import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/Project";

export async function GET() {
  await connectDB();
  const projects = await Project.find();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const project = await Project.create(body);
  return NextResponse.json(project);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  const deletedProject = await Project.findByIdAndDelete(id);

  if (!deletedProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Project deleted successfully" });
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, ...updateData } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(updatedProject);
}
