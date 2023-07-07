import express from "express";
import { isAuth } from "../utils/isAuth.js";
import reviewController from "./reviewController.js";
import upload from "../utils/multer.js";

export const reviewRouter = express.Router();
reviewRouter.get("/search", reviewController.searchContent);
reviewRouter.get("/mypost", isAuth, reviewController.getMyPosts);
reviewRouter.get("/counts", reviewController.getCounts);

reviewRouter.get("/", reviewController.getAllContent);
reviewRouter.get("/:id", reviewController.getSpecificContent);

reviewRouter.post(
  "/",
  isAuth,
  upload.array("image"),
  reviewController.createContent
);
reviewRouter.put(
  "/:id",
  isAuth,
  upload.array("image"),
  reviewController.updateContent
);
reviewRouter.delete("/:id", isAuth, reviewController.deleteContent);
