import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
  params: { id: number };
}

// GET all
export function GET(request: NextRequest, { params: { id } }: Props) {
  if (id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: "Mosh" });
}

// PUT
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  // S1: Validate the request body,  If invalide, return 400
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  // S2: Fetch the user with the given id,  If doesn't exist, return 404
  if (id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // S3: Update the user,  Return the updated user

  return NextResponse.json({ id: id, name: body.name });
}

// Delete
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  if (id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({});
}
