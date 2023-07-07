import express from "express";

import { isAuth } from "../utils/isAuth.js";
import commentController from "./commentController.js";

const commentRouter = express.Router();

commentRouter.post("/", isAuth, commentController.createComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.get("/", commentController.getComments);

export default commentRouter;
