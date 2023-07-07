import express from "express";

import { isAuth } from "../utils/isAuth.js";
import communityController from "./communityController.js";
import upload from "../utils/multer.js";

export const communityRouter = express.Router();

communityRouter.get("/search", communityController.searchContent);
communityRouter.get("/mypost", isAuth, communityController.getMyPosts);
communityRouter.get("/counts", communityController.getCounts);

communityRouter.get("/", communityController.getAllContent);
communityRouter.get("/:id", communityController.getSpecificContent);

communityRouter.post(
  "/",
  isAuth,
  upload.array("image"),
  communityController.createContent
);
communityRouter.put(
  "/:id",
  isAuth,
  upload.array("image"),
  communityController.updateContent
);
communityRouter.delete("/:id", isAuth, communityController.deleteContent);
