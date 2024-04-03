import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

// GET id
export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10) return NextResponse.json({ error: "User not found" });
  return NextResponse.json({ id: 1, name: "Milk", price: 5.5 });
}

// PUT id
export function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const body = request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, ...body });
}

// DELETE id
export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({});
}
