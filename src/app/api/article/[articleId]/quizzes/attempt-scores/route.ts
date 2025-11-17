import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userClerkId, quizResult, sec, articleId } = await request.json();
  console.log({ userClerkId, quizResult, sec, articleId });

  const user = await prisma.users.findUnique({
    where: { clerkid: userClerkId },
  });

  const attempt = await prisma.attempts.create({
    data: { articleid: articleId, userid: user?.id, timespent: sec },
  });

  attempt &&
    quizResult.map(async (item: any) => {
      const score = await prisma.scores.create({
        data: {
          quizid: item.quizQuestionId,
          userid: user?.id,
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
