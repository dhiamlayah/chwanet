const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const resizeImages = require("../middelwares/resizeImages");
const upload = require("../middelwares/multer");
const auth = require("../middelwares/authorization");
const fs = require("fs");

import WorkerModel from "../models/worker";

router.get(
  "/",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const user = await WorkerModel.findById(req.user._id).select("-password "); //select that mean exclude
    res.status(200).json({ user: user });
  })
);

// update informations
router.put(
  "/update",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    if (req.body.phone) {
      const phoneExist = await WorkerModel.findOne({ phone: req.body.phone });
      if (phoneExist) {
        res.status(400).json({ message: "user exist" });
      }
    }
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, req.body);
    await user?.save();
    res.send("success");
  })
);

router.put(
  "/position",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const newUpdate = {
      state: req.body.state,
      delegation: req.body.delegation,
    };
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, newUpdate);
    await user?.save();
    res.send("success");
  })
);

router.put(
  "/",
  auth,
  upload.single("file"),
  resizeImages,
  asyncMiddleware(async (req: any, res: any) => {
    const imageResized = req.imageResized;
    const { workName, discreption, experience } = JSON.parse(req.body.document);
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      workName: workName,
      discreption: discreption.trim(),
      photo: imageResized,
      team: true,
      experience: experience,
    });
    if (user) {
      res.status(200).send("success");
      return await user.save();
    } else {
      res.status(400).send({ message: "worker not found" });
    }
  })
);
router.put(
  "/profilePicrure",
  auth,
  upload.single("file"),
  resizeImages,
  asyncMiddleware(async (req: any, res: any) => {
    const imageResized = req.imageResized;
    const findWorker = await WorkerModel.findById(req.user._id);
    console.log("find worker", findWorker);
    if (findWorker) {
      fs.rmSync(`userPicture/${req.user._id}/${findWorker.photo.filename}`, {
        force: true,
      }); // delete the tmp file as now have buffer
    } else {
      res.status(400).send({ message: " worker not found " });
    }
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      photo: imageResized,
    });
    if (user) {
      await user.save();
      res.status(200).send("success");
    } else {
      res.status(400).send({ message: "faild to change image" });
    }
  })
);

module.exports = router;
