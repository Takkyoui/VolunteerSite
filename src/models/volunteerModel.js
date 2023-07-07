import mongoose from "mongoose";

const { Schema } = mongoose;

// Volunteer 스키마 정의
const volunteerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    recruitmentStatus: {
      type: String,
      enum: ["모집 중", "마감"],
      default: "모집 중",
    },
    recruitmentPeriod: {
      type: String,
      required: true,
    },
    volunteerStartDate: {
      type: String,
      required: true,
    },
    volunteerEndDate: {
      type: String,
      required: true,
    },
    recruitmentLimit: {
      type: Number,
      required: true,
    },
    registeredUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
