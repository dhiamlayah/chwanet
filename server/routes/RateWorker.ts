const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerRatingsAndCommentsModel from "../models/RatingsAndComments";
 


// this path inisilize a schema  for the new Worker when he create a new account
router.get ("/",auth,asyncMiddleware(
    async (req:any,res:any)=>{
        const id=req.user._id
        const idWorker = await WorkerRatingsAndCommentsModel.findOne({_id:id})
 
        console.log('id worker', idWorker)
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
            const date = new Date 
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
                    await worker?.save();
                    res.status(200).send("successfuly update");
                }else{
                    allClients?.push({_id:clientId,Comments:[],Rate:clientRate})
                    await worker?.updateOne({Clients:allClients})
                    await worker?.save()
                    res.status(200).send("successfuly added ")
                }
            }else{
                res.status(400).send("faild to find worker")
            }


 
        } 
)) 

module.exports = router


// if(client._id===findClient._id){
//     client.Comments.push({text:'new update 2',date:date.toLocaleDateString()})
// }