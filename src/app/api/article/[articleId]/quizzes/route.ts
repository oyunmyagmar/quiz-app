import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { article } = await request.json();

  if (!article) {
    return NextResponse;
  }
}
