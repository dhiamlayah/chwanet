const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");

interface WorkerInformation {
    id:string,
    firstName:string,
}

import WorkerModel from "../models/worker";

router.get("/",asyncMiddleware(
    async(req:any,res:any)=>{
        const Workers =await WorkerModel.find({},null,{skip:4,limit:200})
        res.send(Workers)
    }
))


module.exports = router