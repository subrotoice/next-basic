import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

// GET id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (parseInt(params.id) > 10)
    return NextResponse.json({ error: "Product not found" });

  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(product);
}

// PUT id
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const product = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(updatedProduct);
}

// DELETE id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await prisma.product.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({});
}
