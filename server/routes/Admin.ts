import NewWorkNameModel from "../models/NewWorkName";

export{}
const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

//this path if worker want to add new name work send a report to admin to accept it 
router.post("/newDomain",auth,asyncMiddleware(
    async(req:any,res:any)=>{
        const {newDomain}=req.body
        const WorkerId = req.user
        const UpdateWorkNameReport = await NewWorkNameModel.findOne({ _id:WorkerId });
        if(UpdateWorkNameReport){
           await UpdateWorkNameReport.updateOne({newWorkName:newDomain});
           await UpdateWorkNameReport.save()
           return res.status(200).json({message:'report sent successfully'})
        }
        const newWorkName = new NewWorkNameModel({
            _id:WorkerId,
            newWorkName:newDomain,
        })
        await newWorkName.save()
        return res.status(200).json({message:'report sent successfully'})
    }
))