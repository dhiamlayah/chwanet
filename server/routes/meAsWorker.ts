const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerModel from "../models/worker";

const auth = require("../middelwares/authorization")

router.get("/", auth, asyncMiddleware(
    async (req: any, res: any) => {
       const user = await WorkerModel.findById(req.user._id).select("-password"); //select that mean exclude
       res.json({ user: user });
  })
  );

 
module.exports = router