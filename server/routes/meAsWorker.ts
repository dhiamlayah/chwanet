const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const resizeBg = require("../middelwares/resizeBg");
const resizeProfilePicture = require("../middelwares/resizeProfilePicture");
const upload = require("../middelwares/multer");
const auth = require("../middelwares/authorization");
const fs = require("fs");

import UserModel from "../models/users";
import WorkerModel from "../models/worker";

router.get(
  "/",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const user = await WorkerModel.findById(req.user._id).select("-password "); //select that mean exclude
    if(user){
      res.status(200).json({ user: user });
    }else{
      res.status(400).json({message:'worker not found'})
    }

  })
);

// update informations
router.put(
  "/update",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    if (req.body.phone) {
      const phoneExistInWorkerModel = await WorkerModel.findOne({ phone: req.body.phone });
      const phoneExistInClientModel = await UserModel.findOne({ phone: req.body.phone });

      if (phoneExistInWorkerModel || phoneExistInClientModel) {
        return res.status(400).json({ message: "هذا الرقم موجود بالفعل في مكان آخر، اكتب رقم آخر" });
      }
    }
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, req.body);
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
      photo: {filename:imageResized.filename,destination:imageResized.destination},
      backgroundImage:{filename:"communBackground.jpg"},
      experience: experience,
      Rate:{rate:0,length:0}
    });
    if (user) {
      res.status(200).send("success");
      return await user.save();
    } else {
      res.status(400).send({ message: "لم يتم العثور على العامل " });
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
      res.status(400).send({ message: "لم يتم العثور على العامل" });
    }
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      photo: imageResized,
    });
    if (user) {
      await user.save();
      res.status(200).send("success");
    } else {
      res.status(400).send({ message: "فشل في تغيير الصورة" });
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
       return res.status(400).send({ message: "لم يتم العثور على العامل" });
    }
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      backgroundImage: {filename:req.user._id+"/bgImage/"+imageResized.filename},
    });
    if (user) {
      await user.save();
      return  res.status(200).send("success");
    } else {
     return  res.status(400).send({ message: "فشل في تغيير الصورة" });
    }
  })
);



module.exports = router;
