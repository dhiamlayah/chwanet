const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const resizeImages = require("../middelwares/resizeImages");
const resizeBg = require("../middelwares/resizeBg");
const resizeProfilePicture = require("../middelwares/resizeProfilePicture");
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
  resizeProfilePicture,
  asyncMiddleware(async (req: any, res: any) => {
    const imageResized = req.imageResized;
    const { workName, discreption, experience } = JSON.parse(req.body.document);
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      workName: workName,
      discreption: discreption.trim(),
      photo: imageResized,
      backgroundImage:{filename:"communBackground.jpg"},
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
  "/profilePicture",
  auth,
  upload.single("file"),
  resizeProfilePicture,
  asyncMiddleware(async (req: any, res: any) => {
    const imageResized = req.imageResized;
    const findWorker = await WorkerModel.findById(req.user._id);
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

router.put(
  "/profileBackgroudPicture",
  auth,
  upload.single("file"),
  resizeBg,
  asyncMiddleware(async (req: any, res: any) => {
    const imageResized = req.imageResized;
    const findWorker = await WorkerModel.findById(req.user._id);
    if (findWorker) {
      if(findWorker.backgroundImage.filename!=="communBackground.jpg"){
        fs.rmSync(`userPicture/${findWorker.backgroundImage.filename}`, {
          force: true,
        }); // delete the tmp file as now have buffer
      }
    } else {
       return res.status(400).send({ message: " worker not found " });
    }
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      backgroundImage: {filename:req.user._id+"/bgImage/"+imageResized.filename},
    });
    if (user) {
      await user.save();
      return  res.status(200).send("success");
    } else {
     return  res.status(400).send({ message: "faild to change image" });
    }
  })
);


module.exports = router;
