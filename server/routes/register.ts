const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middelwares/asyncMiddleware");
 
import UserModel from "../models/users";

 
router.post("/",
  asyncMiddleware(async (req: any, res: any) => {
    const { firstName, lastName, email, age, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist !!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
    });
    await newUser.save();
    const token = jwt.sign(
      { _id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.access_token_secret
    );
    res.setHeader("token", token);
    return res.status(200).json({ message: "user created successfuly" });
  })
);

module.exports = router