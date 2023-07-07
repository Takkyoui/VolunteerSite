import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./src/user/userRouter.js";
import volunteerRouter from "./src/volunteer/volunteerRouter.js";
import { communityRouter } from "./src/community/communityRouter.js";
import { reviewRouter } from "./src/review/reviewRouter.js";
import commentRouter from "./src/comment/commnetRouter.js";

dotenv.config();
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB에 연결되었습니다.");
  } catch (error) {
    console.error("MongoDB 연결에 실패했습니다:", error);
  }
};

connectToDatabase();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/api/volunteer", volunteerRouter);
app.use("/api/community", communityRouter);
app.use("/api/review", reviewRouter);
app.use("/api/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("안녕하세요, Express 서버에 접속하셨습니다!");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
