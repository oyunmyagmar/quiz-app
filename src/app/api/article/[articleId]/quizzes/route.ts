import { query } from "@/lib/connectDb";
import { prisma } from "@/lib/prisma";
import { QuizType } from "@/lib/types";
import { parseJsonBlockSafe } from "@/lib/utils/get-clean-text";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) => {
  const { articleId } = await params;
  // const quizzes = await query("SELECT * FROM quizzes"); // negiig avah

  const quiz = await prisma.quizzes.findFirst({
    where: {
      articleid: articleId,
    },
  });

  // const quizzes = await prisma.quizzes.findMany();

  console.log({ quiz });
  return NextResponse.json({ data: quiz }, { status: 200 });
};

export async function POST(request: NextRequest) {
  const { selectedArticleContent, articleId } = await request.json();

  if (!selectedArticleContent || !articleId) {
    return NextResponse.json(
      { error: "Missing required fields!" },
      { status: 400 }
    );
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 5 multiple choice questions based on this article: ${selectedArticleContent}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
  });

  const generatedQuiz = response.text;
  console.log("generatedQuiz", generatedQuiz, "generatedQuiz");

  const quizObj = parseJsonBlockSafe(generatedQuiz!);
  console.log("quizObj", quizObj, "quizObj");
  if (!quizObj) {
    return NextResponse.json(
      { error: "Failed to generate quiz." },
      { status: 500 }
    );
  }

  try {
    quizObj.map(async (item: QuizType) => {
      const quiz = await prisma.quizzes.create({
        data: {
          question: item.question,
          options: item.options,
          answer: item.answer,
          articleid: articleId,
        },
      });
      console.log("QUIZ", { quiz }, "QUIZ");
    });
    console.log("Quiz added to DB successfully");
  } catch (error) {
    console.error("Error while adding quiz to DB", error);
  }

  return NextResponse.json({
    message: "Quiz added to DB successfully",
    data: quizObj,
  });
}

// for (const item of quizObj) {
//   // Escape single quotes in question
//   const safeQuestion = item.question.replace(/'/g, "''");
//   // Escape single quotes and double quotes in options, then make PG array literal
//   const pgArray = `{${item.options
//     .map((opt: string) => `"${opt.replace(/"/g, '\\"').replace(/'/g, "''")}"`)
//     .join(",")}}`;

//   try {
//     const quiz = await query(
//       `INSERT INTO quizzes (question, options, answer, articleId)
//       VALUES ('${safeQuestion}', '${pgArray}', '${item.answer}', '${articleId}')`
//     );
//     console.log("Quiz added to DB successfully");
//   } catch (error) {
//     console.error("Error while adding quiz to DB", error, item);
//   }
// }

// console.log("generatedQuiz", generatedQuiz, "generatedQuiz");
// return NextResponse.json({ text: generatedQuiz });
