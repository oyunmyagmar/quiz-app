import { getAllMockTopics } from "@/lib/services/mock-topic-service";
import { NextResponse } from "next/server";

export async function GET() {
  const mockTopics = await getAllMockTopics();
  return NextResponse.json({ data: mockTopics }, { status: 200 });
}
