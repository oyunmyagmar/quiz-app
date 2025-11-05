import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const articles = await query("SELECT * FROM articles");

  return NextResponse.json({ data: articles }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { title, content, summary } = body;

  console.log(
    title,
    "TITLE",
    "CONTENT",
    content,
    "CONTENT",
    "SUMMARY",
    summary,
    "SUMMARY"
  );

  const article = await query(
    `INSERT INTO articles(title, content, summary) VALUES('${title}', '${content}', '${summary}')`
  );

  const articleId = await query(
    `SELECT article.id FROM articles WHERE article.title = ${title}`
  );

  return NextResponse.json({
    message: "Article added to DB successfully",
    data: articleId,
  });
};
