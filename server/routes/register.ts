const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middelwares/asyncMiddleware");
 
import UserModel from "../models/users";

 
router.post("/",
  asyncMiddleware(async (req: any, res: any) => {
    const { firstName, lastName, phone, state, password ,delegation ,possition } = req.body;
    const user = await UserModel.findOne({ phone });
    if (user) return res.status(400).json({ message:  "  !! المستخدم موجود بالفعل  " });
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
    return res.status(200).json({ message: "تم إنشاء المستخدم بنجاح" });
  })
);

module.exports = router