import mongoose from "mongoose";

export const communityCommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CommunityComment = mongoose.model(
  "CommunityComment",
  communityCommentSchema
);
