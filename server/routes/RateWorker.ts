const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerRatingsAndCommentsModel, { ClientRateAndComments } from "../models/RatingsAndComments";
import WorkerModel from "../models/worker";
 
const calcRate  = (Client:ClientRateAndComments[])=>{
    const length = Client.length;
    let numOfClientWhoRate = 0
    let somme =0
    if(length===0)return {sum:0,length:numOfClientWhoRate}
    Client.map((client)=>{
        if(client.Rate!==null){
            somme=somme+client.Rate
            numOfClientWhoRate=numOfClientWhoRate+1
        }
    })
 
    return { rate :somme/numOfClientWhoRate, length :numOfClientWhoRate}
}

// this path inisilize a schema  for the new Worker when he create a new account
router.get ("/",auth,asyncMiddleware(
    async (req:any,res:any)=>{
        const id=req.user._id
        const idWorker = await WorkerRatingsAndCommentsModel.findOne({_id:id})
        if(idWorker===null){
            const AddWorkerRate = new WorkerRatingsAndCommentsModel({
                _id:id,
                Clients:[]
        })
        await AddWorkerRate.save()  
        return res.status(200).json({message:"we add worker to the rate and comments schema successfuly"})
        }
        else return res.status(400).send({message:'worker already exist in the rate and comments schema'})
     }
))


// this path fo client to make a rate 
router.put("/",auth,asyncMiddleware(
    async(req:any,res:any)=>{
            const clientRate=req.body.Rate
            const clientId : string = req.user._id
            const workerId = req.body.workerId
            const worker = await WorkerRatingsAndCommentsModel.findOne({_id:workerId})
            const workerModel = await WorkerModel.findOne({_id:workerId})

            if(worker){
                let allClients = worker?.Clients
                const findClient = allClients?.find((e)=>{
                    if( e._id===clientId) return e
                })
                if(findClient!==undefined){
                    const updateClients =allClients?.map((client)=>{
                    if(client._id===findClient._id){
                        client.Rate=clientRate
                    }
                    return client
                    })
                    await worker?.updateOne({Clients:updateClients});
                    res.status(200).send("successfuly");
                    if(updateClients){
                        await workerModel?.updateOne({Rate:calcRate(updateClients)})
                        await workerModel?.save()       
                    }
                    await worker?.save();
                }else{
                    allClients?.push({_id:clientId,Comment:null,Rate:clientRate})
                    await worker?.updateOne({Clients:allClients})
                    res.status(200).send("successfuly")
                    if(allClients) {
                        await workerModel?.updateOne({Rate:calcRate(allClients)})
                        await workerModel?.save()    
                    }
                    await worker?.save()
                }
            }else{
                res.status(400).send({message:"faild to find worker"})
            }
        } 
)) 






module.exports = router

