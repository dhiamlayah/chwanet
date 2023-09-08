const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middelwares/asyncMiddleware");
 
import UserModel from "../models/users";

router.post("/",
  asyncMiddleware(async (req: any, res: any) => {
    const { password, phone } = req.body;
    const user = await UserModel.findOne({ phone });
    if (!user) {
      res.status(400).json({ message: "هاتف أو كلمة مرور غير صالحة" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      !validPassword &&
        res.status(400).json({ message: "كلمة المرور أو الهاتف غير صحيحة" });
      const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.access_token_secret
      ); // two parameters user id and secrete
      res.setHeader("token", token);
      res.status(200).json({ message: "تسجيل دخول المستخدم بنجاح" });
    }
  })
);

module.exports = router