import { MockTopic } from "../models/MockTopic";
import connectDB from "../mongodb";
import { MockTopicType } from "../types";

export const getAllMockTopics = async (): Promise<MockTopicType[]> => {
  await connectDB();
  const allMockTopics: MockTopicType[] = await MockTopic.find().select("-__v");
  return allMockTopics;
};

export const createMockTopic = async (
  mockTitle: string,
  mockDescription: string
) => {
  await connectDB();

  const newMockTopic = new MockTopic({ mockTitle, mockDescription });
  await newMockTopic.save();
  return newMockTopic;
};
