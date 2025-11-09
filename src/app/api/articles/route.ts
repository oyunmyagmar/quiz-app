import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const articles = await query("SELECT * FROM articles");

  return NextResponse.json({ data: articles.rows }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { title, content, summary } = body;

  const article = await query(
    `INSERT INTO articles(title, content, summary) VALUES('${title}', '${content}', '${summary}') RETURNING *`
  );

  // console.log({ article }, "article");
  return NextResponse.json({
    message: "Article added to DB successfully",
    data: article.rows[0],
  });
};
