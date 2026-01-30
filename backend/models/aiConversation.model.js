import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    tokensUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const aiConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "New Conversation",
    },

    messages: [messageSchema],

    intent: {
      type: String,
      default: "general",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    totalTokens: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const AIConversation = mongoose.model(
  "AIConversation",
  aiConversationSchema,
);
