const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");
import WorkerModel from "../models/worker";

interface WorkerInformation {
    [key: string]: string;
}


router.get("/",asyncMiddleware(
    async(req:any,res:any)=>{
        const Workers =(await WorkerModel.find({},'photo firstName workName phone lastName',{skip:0,limit:200}))
        res.send(Workers)
    }
))

router.post("/",asyncMiddleware(
    async(req:any,res:any)=>{
        const filterBy=req.body
        let sendFilter:WorkerInformation={}
        if(filterBy.domain!==""){
            sendFilter.workName=filterBy.domain
        }
        if(filterBy.state!==""){
            sendFilter.state=filterBy.state
            if(filterBy.delegation!==""){
                sendFilter.delegation=filterBy.delegation
            }
        }
        console.log(sendFilter)
        const Workers =(await WorkerModel.find(sendFilter,'photo firstName workName phone lastName',{skip:0,limit:200}))
        res.send(Workers)
    }
))


module.exports = router