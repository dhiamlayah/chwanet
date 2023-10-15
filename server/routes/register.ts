const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const auth = require("../middelwares/authorization");
const multer = require("multer");

import UserModel from "../models/users";
import WorkerModel from "../models/worker";

const storage = multer.diskStorage({
  destination: "./userPicture",
  filename(req: any, file: any, cd: any) {
    cd(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/",
  asyncMiddleware(async (req: any, res: any) => {
    const {
      firstName,
      lastName,
      phone,
      state,
      password,
      delegation,
      possition,
    } = req.body;
    if (possition === "client") {
      const user = await UserModel.findOne({ phone });
      if (user)
        return res
          .status(400)
          .json({ message: "  !! المستخدم موجود بالفعل  " });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        firstName,
        lastName,
        state,
        password: hashedPassword,
        delegation,
        possition,
        phone,
      });
      await newUser.save();
      const token = jwt.sign(
        { _id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.access_token_secret
      );
      res.setHeader("token", token);
      return res
        .status(200)
        .json({ message: "تم إنشاء المستخدم بنجاح", user: "Client" });
    } else {
      const worker = await WorkerModel.findOne({ phone });
      if (worker)
        return res.status(400).json({ message: " !! المستخدم موجود بالفعل  " });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newWorker = new WorkerModel({
        firstName,
        lastName,
        state,
        password: hashedPassword,
        delegation,
        possition,
        phone,
        workName: null,
        discreption: null,
        photo: null,
        team: null,
        experience: null,
      });
      await newWorker.save();
      const token = jwt.sign(
        { _id: newWorker._id, isAdmin: newWorker.isAdmin },
        process.env.access_token_secret
      );
      res.setHeader("token", token);
      return res
        .status(200)
        .json({ message: "تم إنشاء المستخدم بنجاح", user: "Worker" });
    }
  })
);

router.put(
  "/",
  auth,
  upload.single("file"),
  asyncMiddleware(async (req: any, res: any) => {
    const file = req.file;    
    const {workName,discreption,experience}=JSON.parse(req.body.document)
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      workName: workName,
      discreption: discreption,
      photo: file,
      team: true,
      experience: experience,
    });
    if (user) {
      res.send("success");
      return await user.save();
    }
  })
);


router.put("/:id",auth,
  asyncMiddleware(async(req:any,res:any)=>{
    const id = req.params.id
    const updatedSomthing = req.body[id]
    const user = await WorkerModel.findByIdAndUpdate(req.user._id, {
      id:updatedSomthing,
    })
    res.send("success")
    return await user?.save()}

  )
)


module.exports = router;
