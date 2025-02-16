import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import UserModel from "../models/users";
import WorkerModel from "../models/worker";

router.post(
  "/",
  asyncMiddleware(async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      phone,
      state,
      password,
      delegation,
      possition,
    } = req.body;
    let newUser ;

    const user = await UserModel.findOne({ phone });
    const worker = await WorkerModel.findOne({ phone });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userPossition =  (possition==="client") ? "Client" : "Worker"
    if (user || worker)
      return res.status(400).json({ message: "  !! المستخدم موجود بالفعل  " });

    if (possition === "client") {
        newUser = new UserModel({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        state,
        password: hashedPassword,
        delegation,
        possition,
        phone,
      });
    } else {
        newUser = new WorkerModel({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        state,
        password: hashedPassword,
        delegation,
        possition,
        phone,
      });
     
    }

    await newUser.save();
    const token = jwt.sign(
      { _id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.TOKEN
      );
    res.setHeader("token", token);
    return res
      .status(200)
      .json({ message: "تم إنشاء المستخدم بنجاح", user: userPossition });
  })
);

module.exports = router;
