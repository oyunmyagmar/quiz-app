import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;

  const attempts = await prisma.attempts.findMany({
    where: { articleid: articleId },
    orderBy: { id: "asc" },
  });

  const results = await prisma.scores.findMany({
    where: { quizzes: { articleid: articleId } },
  });
  console.log({ attempts, results });
  return NextResponse.json({ attempts, results });
}

export async function POST(request: NextRequest) {
  const { userClerkId, quizResult, sec, articleId } = await request.json();
  console.log({ userClerkId, quizResult, sec, articleId });

  const user = await prisma.users.findUnique({
    where: { clerkid: userClerkId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Missing required field!" },
      { status: 400 }
    );
  }

  const attempt = await prisma.attempts.create({
    data: { articleid: articleId, userid: user.id, timespent: sec },
  });

  attempt &&
    quizResult.map(async (item: any) => {
      const score = await prisma.scores.create({
        data: {
          quizid: item.quizQuestionId,
          userid: user.id,
          attemptid: attempt.id,
          score: item.quizScore,
          useranswer: item.clientAnswer,
          correctanswer: item.quizCorrectAnswer,
        },
      });
      console.log({ score });
    });

  console.log({ attempt });
  return NextResponse.json({
    message: "Result added to DB successfully",
    data: "",
  });
}
