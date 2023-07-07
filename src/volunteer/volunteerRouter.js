import express from "express";
import volunteerController from "./volunteerController.js";
import { isAuth } from "../utils/isAuth.js";
import upload from "../utils/multer.js";

const volunteerRouter = express.Router();
volunteerRouter.get("/search", volunteerController.searchContent);
volunteerRouter.get("/counts", volunteerController.getCounts);
volunteerRouter.post("/participate", isAuth, volunteerController.participate);
volunteerRouter.get("/mypost", isAuth, volunteerController.getMypost);
volunteerRouter.get(
  "/myparticipate",
  isAuth,
  volunteerController.getparticipate
);

volunteerRouter.get("/", volunteerController.getAllVolunteers);
volunteerRouter.get("/:volunteer_id", volunteerController.getVolunteerById);
volunteerRouter.post(
  "/",
  isAuth,
  upload.array("image"),
  volunteerController.createVolunteer
);
volunteerRouter.put(
  "/:volunteer_id",
  isAuth,
  upload.array("image"),
  volunteerController.updateVolunteer
);
volunteerRouter.delete(
  "/:volunteer_id",
  isAuth,
  volunteerController.deleteVolunteer
);

export default volunteerRouter;
