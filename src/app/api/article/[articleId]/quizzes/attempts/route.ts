import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { sec, articleId } = await request.json();
  console.log({ sec, articleId });

  if (!sec) {
    return NextResponse.json(
      { error: "Missing required field!" },
      { status: 400 }
    );
  }

  const attempt = await prisma.attempts.create({
    data: { timespent: sec, articleid: articleId },
  });

  return NextResponse.json({
    message: "Time spent added to DB successfully",
    data: attempt,
  });
}
