import mongoose, { Schema } from "mongoose";

type MockTopicSchemaType = {
  mockTitle: string;
  mockDescription: string;
};

const MockTopicSchema = new Schema({
  mockTitle: { type: String, required: true },
  mockDescription: { type: String, required: true },
});

export const MockTopic =
  mongoose.models.MockTopic ||
  mongoose.model<MockTopicSchemaType>("MockTopic", MockTopicSchema);
