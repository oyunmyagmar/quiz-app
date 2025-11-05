import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  const { selectedArticleContent } = await request.json();

  // console.log("article", article, "article");

  if (!selectedArticleContent) {
    return NextResponse.json(
      { error: "Missing required field!" },
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
  return NextResponse.json({ text: generatedQuiz });
}
