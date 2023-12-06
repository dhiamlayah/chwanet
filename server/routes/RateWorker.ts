const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerRatingsAndCommentsModel from "../models/RatingsAndComments";
 


// this path inisilize a schema  for the new Worker when he create a new account
router.post ("/",auth,asyncMiddleware(
    async (req:any,res:any)=>{
        console.log(req.user._id)
        const id=req.user._id
        const idWorker = await WorkerRatingsAndCommentsModel.findOne({id})
        
         if(!idWorker){
 
            const AddWorkerRate = new WorkerRatingsAndCommentsModel({
                _id:id,
                Clients:[]
        })
        await AddWorkerRate.save()  
        return res.send("successfuly1")

        }
        else return res.send('not successfuly2')
        
     }
))


// this path fo client to make a rate 
// router.put("/",auth,asyncMiddleware(
//     const {user} = req.body
//     async(req:any,res:any){
//             const pastClients = idWorker.Clients
//             pastClients?.push(Client)
//             console.log(pastClients)

//             await idWorker.updateOne({Clients:pastClients})    
//             await idWorker.save()
//             res.send("successfuly2")
//   }
// ))

module.exports = router