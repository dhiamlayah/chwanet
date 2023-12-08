const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerRatingsAndCommentsModel from "../models/RatingsAndComments";
 


// this path inisilize a schema  for the new Worker when he create a new account
router.post ("/",auth,asyncMiddleware(
    async (req:any,res:any)=>{
        const id=req.user._id
        const idWorker = await WorkerRatingsAndCommentsModel.findOne({id})
        if(idWorker!==null){
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
router.put("/",asyncMiddleware(
    async(req:any,res:any)=>{
            // const idClient=req.user._id
            const clientId : string = req.body.clientId
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
                        client.Comments.push({text:'new update 2',date:date.toLocaleDateString()})
                    }
                    return client

                })
                await worker?.updateOne({Clients:updateClients})
                await worker?.save()
                res.send("successfuly update")

            }else{
                allClients?.push({_id:clientId,Comments:[{text:'aaaa',date:date.toLocaleDateString()}],Rate:5})
                await worker?.updateOne({Clients:allClients})
                await worker?.save()
                res.send("successfuly added ")
            }
            }


 
        } 
)) 

module.exports = router