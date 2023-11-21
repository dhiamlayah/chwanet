const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const auth = require("../middelwares/authorization");
const resizeImages = require("../middelwares/resizeImages")
const upload = require("../middelwares/multer")

import UserModel from "../models/users";
import WorkerModel from "../models/worker";


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
  resizeImages,
  asyncMiddleware(async (req: any, res: any) => {
    const imageResized = req.imageResized
    console.log('imageResized',imageResized)
    const {workName,discreption,experience}=JSON.parse(req.body.document)
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


router.put("/:id",auth,
  asyncMiddleware(async(req:any,res:any)=>{
    let newUpdate ={}
    const id = req.params.id
    console.log('id',id)
    console.log("data mr dhia !",req.body)
    if(id ==='name'){
       newUpdate ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
      }
    }else if(id==="state"){
        newUpdate={
          state:req.body.state,
          delegation:req.body.delegation
        }
    }else{
      newUpdate={
        [id]:req.body[id]
      }
    }
    const user = await WorkerModel.findByIdAndUpdate(req.user._id,newUpdate)
    res.send("success")
    return await user?.save()}
  
  )
)


module.exports = router;

  
    // const metadata = await image.metadata();
  
    
  
    //     // Now that the processing is done, delete the temporary file
    //     fs.unlinkSync(file.path);
  
    //     // Save the resized image back to the same path
    //     await image.toFile('./userPicture');
    