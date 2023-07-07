import mongoose from "mongoose";

// 유저 스키마 정의
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    selfIntro: {
      type: String,
      default: "안녕하세요~! 봉사활동을 좋아하는 사람입니다",
    },
    image: {
      type: Array,
      default: "/uploads/profile.png",
    },
  },
  {
    timestamps: true,
  }
);

// 유저 모델 생성
const User = mongoose.model("User", userSchema);

export default User;
