const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import UserModel from "../models/users";
import WorkerModel from "../models/worker";


// in this route we sheack first if the user is exist in client Model (User) if not then sheak if exist in Worker model
router.post(
  "/",
  asyncMiddleware(async (req: any, res: any) => {
    const { password, phone } = req.body;
    const user = await UserModel.findOne({ phone });

    if (!user) {
      const worker = await WorkerModel.findOne({ phone });
      if (!worker) {
        return  res.status(400).json({ message: "هاتف أو كلمة المرور  غير صالحة" });
      } else {
        const validPassword = await bcrypt.compare(password, worker.password);
        !validPassword &&
          res.status(400).json({ message: "كلمة المرور أو الهاتف غير صحيحة" });
        const token = jwt.sign(
          { _id: worker._id, isAdmin: worker.isAdmin },
          process.env.access_token_secret
        ); // two parameters worker id and secrete
        res.setHeader("token", token);
        res.status(200).json({ message: "تسجيل دخول المستخدم بنجاح" ,user: "Worker"});
      }
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      !validPassword &&
        res.status(400).json({ message: "كلمة المرور أو الهاتف غير صحيحة" });
      const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.access_token_secret
      ); // two parameters user id and secrete
      res.setHeader("token", token);
      res.status(200).json({ message: "تسجيل دخول المستخدم بنجاح" ,user: "Client" });
    }
  })
);

module.exports = router;

