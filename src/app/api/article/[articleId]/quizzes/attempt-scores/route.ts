import { prisma } from "@/lib/prisma";
import { QuizResultType, ScoreType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userClerkId, quizResult, sec, articleId } = await request.json();
  console.log({ userClerkId, quizResult, sec, articleId });

  const user = await prisma.users.findUnique({
    where: { clerkid: userClerkId },
  });

  quizResult.map(async (item: any) => {
    const score = await prisma.scores.create({
      data: {
        quizid: item.quizQuestionId,
        userid: user?.id,
        score: item.quizScore,
        useranswer: item.clientAnswer,
        correctanswer: item.quizCorrectAnswer,
      },
    });
  });

  const totalScores = await prisma.scores.count({
    where: { quizzes: { articleid: articleId } },
  });
  console.log({ totalScores });

  return NextResponse.json({
    message: "Result added to DB successfully",
    data: "",
  });
}
