import { query } from "@/lib/connectDb";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { quizScores } = await request.json();
  console.log({ quizScores });

  {
    quizScores.map(async (item: any) => {
      const score = await prisma.scores.create({
        data: { quizid: item.quizQuestionId, score: item.quizScore },
      });
    });
  }

  return NextResponse.json({
    message: "Score added to DB successfully",
    data: quizScores,
  });
}
