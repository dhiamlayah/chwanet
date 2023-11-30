const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import UserModel from "../models/users";
import ProfilesModels from "../models/Profiles";
const auth = require("../middelwares/authorization");

router.get("/", auth, asyncMiddleware(
    async (req: any, res: any) => {
       const user = await UserModel.findById(req.user._id).select("-password"); //select that mean exclude
       res.json({ user: user }); 
  })
  );

router.post("/profile",auth,asyncMiddleware(
    async(req:any , res:any)=>{
        const profile= await ProfilesModels.findById(req.user._id)
        if(!profile) return res.status(400).json({message:'Profile dont exist'})
        //** this methed is easy just take the publication and add it to the data base  */
    }
))  

router.put("/profile",auth,asyncMiddleware(
    async(req:any , res:any)=>{
        //** this methed is easy just update or modify publication from the data base  */
    }
))

router.delete("/profile",auth,asyncMiddleware(
    async(req:any, res:any)=>{
        //** this methed is easy just delate a publication from the data base  */
    }
))

  module.exports = router