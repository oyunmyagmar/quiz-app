import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userScore, articleId } = await request.json();
  //   console.log({ userScore });
  //   console.log({ articleId });

  const score = await query(
    `INSERT INTO scores(score, quizid) VALUES('${userScore}', '${articleId}')`
  );

  return NextResponse.json({
    message: "Score added to DB successfully",
    data: score,
  });
}
