import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) => {
  const { articleId } = await params;

  const article = await query(
    `SELECT * FROM articles WHERE id= '${articleId}'`
  );
  const articleData = article.rows[0];
  // console.log({ articleData }, "articleData");
  return NextResponse.json({ data: articleData }, { status: 200 });
};
