import { connectDB } from "@/lib/mongodb";
import { Message } from "@/lib/models/Message";
import { NextResponse } from "next/server";

// Create a new message
export async function POST(req: Request) {
  await connectDB();
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await Message.create({ name, email, message });
  return NextResponse.json({ success: true });
}

// Get all messages
export async function GET() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json(messages);
}

// Mark message as read/unread
export async function PATCH(req: Request) {
  await connectDB();
  const { id, read } = await req.json();

  if (!id || typeof read !== "boolean") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const updated = await Message.findByIdAndUpdate(id, { read }, { new: true });

  if (!updated) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: updated });
}

// Delete a message
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const deleted = await Message.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}