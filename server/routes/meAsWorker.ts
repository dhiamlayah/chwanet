const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const resizeImages = require("../middelwares/resizeImages");
const upload = require("../middelwares/multer");
const auth = require("../middelwares/authorization");

import WorkerModel from "../models/worker";

router.get(
  "/",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const user = await WorkerModel.findById(req.user._id).select("-password"); //select that mean exclude
    res.status(200).json({ user: user });
  })
);

// update informations

router.put(
  "/name",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const newUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, newUpdate);
    await user?.save();
    res.send("success");
  })
);

// this route for updating phone , workeDomaine , discreptions
router.put(
  "/:id",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const id = req.params.id;
    const newUpdate = {
      [id]: req.body.id,
    };
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, newUpdate);
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
      discreption: discreption,
      photo: imageResized,
      team: true,
      experience: experience,
    });
    if (user) {
      res.send("success");
      return await user.save();
    }
  })
);

module.exports = router;
