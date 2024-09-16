import { Response } from "express";

const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const auth = require("../middelwares/authorization");

import UserModel from "../models/users";

router.get("/", auth, asyncMiddleware(
    async (_: any, res: Response) => {
       const user = await UserModel.findById(res.locals.user._id).select("-password "); //select that mean exclude
       if(user){
        res.status(200).json({ user: user });
        }else{
            res.status(400).json({message:'worker not found'})
        }
  
    })
  );


  module.exports = router