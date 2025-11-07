import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { quizScores } = await request.json();
  console.log({ quizScores });

  {
    quizScores.map(async (item: any) => {
      const score = await query(
        `INSERT INTO scores(quizid, score) VALUES('${
          item.quizQuestionId
        }', '${Number(item.quizScore)}')`
      );
    });
  }

  return NextResponse.json({
    message: "Score added to DB successfully",
    data: "",
  });
}
