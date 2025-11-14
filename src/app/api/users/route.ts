import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { clerkId, email, name } = await request.json();
  console.log({ clerkId }, { email }, { name });

  if (!clerkId || !email || !name) {
    return NextResponse.json({ message: "Missing required fields!" });
  }

  const userUnique = await prisma.users.findUnique({
    where: { clerkid: clerkId },
  });

  if (userUnique?.clerkid !== clerkId) {
    const user = await prisma.users.create({
      data: { clerkid: clerkId, email: email, name: name },
    });
  }

  return NextResponse.json({
    message: "User registered successfully",
    data: userUnique,
  });
}
