export {};
const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const admin = require("../middelwares/admin");
import NewWorkNameModel from "../models/NewWorkName";
import ProfilesModels from "../models/ProfilesPictures";
import WorkerRatingsAndCommentsModel from "../models/RatingsAndComments";
import WorkerModel from "../models/worker";

//this path if worker want to add new name work send a report to admin to accept it
router.post(
  "/newDomain",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const { newDomain } = req.body;
    const WorkerId = req.user;
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
  asyncMiddleware(async (req: any, res: any) => {
    const allNewDomain = await NewWorkNameModel.find();
    res.status(200).json({ allNewDomain });
  })
);

router.get(
  "/isAdmin",
  auth,
  admin,
  asyncMiddleware(async (req: any, res: any) => {
    res.status(200).send({ message: "is an admin" });
  })
);

router.put(
  "/:id",
  auth,
  admin,
  asyncMiddleware(async (req: any, res: any) => {
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
  asyncMiddleware(async (req: any, res: any) => {
    const id = req.params.id;
    const workModel = await WorkerModel.deleteOne({ _id: id });
    const profileModel = await ProfilesModels.deleteOne({ _id: id });
    const Rating = await WorkerRatingsAndCommentsModel.deleteOne({ _id: id });
    const Name = await NewWorkNameModel.deleteOne({ _id: id });
    console.log(workModel);
    console.log(profileModel);
    console.log(Rating);
    console.log(Name);

    res.send("success");
  })
);

module.exports = router;
