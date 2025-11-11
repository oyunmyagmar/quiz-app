import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const articles = await prisma.articles.findMany({
    orderBy: { createdat: "asc" },
  });

  return NextResponse.json({ data: articles }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { title, content, summary } = body;

  const article = await prisma.articles.create({
    data: { title: title, content: content, summary: summary },
  });

  return NextResponse.json({
    message: "Article added to DB successfully",
    data: article,
  });
};
