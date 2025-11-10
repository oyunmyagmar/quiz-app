import { query } from "@/lib/connectDb";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) => {
  const { articleId } = await params;

  // const article = await query(
  //   `SELECT * FROM articles WHERE id= '${articleId}'`
  // );

  const article = await prisma.articles.findFirst({
    where: {
      id: articleId,
    },
  });

  // console.log({ article }, "SELECTED ARTICLE GET");
  return NextResponse.json({ data: article }, { status: 200 });
};
