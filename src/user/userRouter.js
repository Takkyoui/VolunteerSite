import express from "express";

import { isAuth } from "../utils/isAuth.js";
import upload from "../utils/multer.js";
import userController from "./userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.get("/myinfo", isAuth, userController.getMyInfo);
userRouter.post("/login", userController.login);
userRouter.put(
  "/update",
  isAuth,
  upload.array("image"),
  userController.updateUser
);
userRouter.delete("/delete", isAuth, userController.deleteUser);

export default userRouter;
