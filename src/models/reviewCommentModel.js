import mongoose from "mongoose";

const reviewCommentSchema = new mongoose.Schema(
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
      ref: "Review",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReviewComment = mongoose.model(
  "ReviewComment",
  reviewCommentSchema
);
