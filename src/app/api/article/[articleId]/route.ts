import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) => {
  const { articleId } = await params;

  const article = await prisma.articles.findFirst({
    where: {
      id: articleId,
    },
    omit: { userid: true, createdat: true, updatedat: true },
  });

  return NextResponse.json({ data: article }, { status: 200 });
};
