import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  const { articleTitle, articleContent } = await request.json();

  // console.log(
  //   articleTitle,
  //   "-articleTitle-",
  //   articleContent,
  //   "-articleContent-"
  // );

  if (!articleTitle || !articleContent) {
    return NextResponse.json(
      { error: "Missing required fields!" },
      { status: 400 }
    );
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Please provide a concise summary of the following article: ${articleContent} with max 50 words`,
  });

  const generatedSummary = response.text;
  console.log("generatedSummary", generatedSummary, "generatedSummary");
  return NextResponse.json({ text: generatedSummary });
}
