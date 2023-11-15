const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");
import WorkerModel from "../models/worker";

interface WorkerInformation {
    [key: string]: string;
}


router.get("/",asyncMiddleware(
    async(req:any,res:any)=>{
        const page = req.query.page
        const limit = req.query.limit
        const startIndex = (page-1)*limit
        const allWorkers = (await WorkerModel.find().countDocuments())
        const Workers =(await WorkerModel.find({},'photo firstName workName phone lastName',{skip:startIndex,limit:limit}))
        res.send({Workers,'numberOfWorkers':allWorkers})
    }
))



router.post("/",asyncMiddleware(
    async(req:any,res:any)=>{
        const page = req.query.page
        const limit = req.query.limit
        const startIndex = (page-1)*limit
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
        const allWorkers = (await WorkerModel.find(sendFilter).countDocuments())
        const Workers =(await WorkerModel.find(sendFilter,'photo firstName workName phone lastName',{skip:startIndex,limit:limit}))
        res.send({Workers,'numberOfWorkers':allWorkers})
    }
))


module.exports = router