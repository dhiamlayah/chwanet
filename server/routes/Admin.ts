export { };
import { Request, Response } from "express";
const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const admin = require("../middelwares/admin");
const fs = require('fs')

import NewWorkNameModel from "../models/NewWorkName";
import ProfilesModels from "../models/ProfilesPictures";
import WorkerRatingsAndCommentsModel from "../models/RatingsAndComments";
import WorkerModel from "../models/worker";

//this path if worker want to add new work name  send a report to admin to accept it
router.post(
  "/newDomain",
  auth,
  asyncMiddleware(async (req: Request, res: Response) => {
    const { newDomain } = req.body;
    const WorkerId = res.locals.user;
    const UpdateWorkNameReport = await NewWorkNameModel.findOne({
      _id: WorkerId,
    });
    if (UpdateWorkNameReport) {
      await UpdateWorkNameReport.updateOne({ newWorkName: newDomain });
      await UpdateWorkNameReport.save();
      return res.status(200).json({ message: "report sent successfully" });
    }
    const newWorkName = new NewWorkNameModel({
      _id: WorkerId,
      newWorkName: newDomain,
    });
    await newWorkName.save();
    return res.status(200).json({ message: "report sent successfully" });
  })
);

router.get(
  "/newDomain",
  auth,
  admin,
  asyncMiddleware(async (_: any, res: Response) => {
    const allNewDomain = await NewWorkNameModel.find();
    res.status(200).json({ allNewDomain });
  })
);

router.get(
  "/isAdmin",
  auth,
  admin,
  asyncMiddleware(async (_: any, res: Response) => {
    res.status(200).send({ message: "is an admin" });
  })
);

router.put(
  "/:id",
  auth,
  admin,
  asyncMiddleware(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await WorkerModel.findByIdAndUpdate(id, {
      workName: req.body.NewWorkName,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user?.save();
    await NewWorkNameModel.deleteOne({ _id: id });
    res.send("success");
  })
);

router.delete(
  "/:id",
  auth,
  admin,
  asyncMiddleware(async (req: Request, res: Response) => {
    const id = req.params.id;
    await WorkerModel.deleteOne({ _id: id });
    await ProfilesModels.deleteOne({ _id: id });
    await WorkerRatingsAndCommentsModel.deleteOne({ _id: id });
    await NewWorkNameModel.deleteOne({ _id: id });
    fs.rm(`userPicture/${id}`, { recursive: true }, (err: any) => {
      if (err) {
        res.status(400).send({ message: 'Error deleting directory not found ' });
      } else {
        res.status(200).send('Directory deleted successfully');
      }
    });

  })
);

module.exports = router;
