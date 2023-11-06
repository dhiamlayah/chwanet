const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");
import WorkerModel from "../models/worker";

interface WorkerInformation {
    id:string,
    firstName:string,
}


router.get("/",asyncMiddleware(
    async(req:any,res:any)=>{
        const Workers =(await WorkerModel.find({},'photo firstName workName phone lastName',{skip:0,limit:200}))
        res.send(Workers)
    }
))


module.exports = router