import mongoose from "mongoose";

const volunteerCommentSchema = new mongoose.Schema(
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
      ref: "Volunteer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const VolunteerComment = mongoose.model(
  "VolunteerComment",
  volunteerCommentSchema
);
