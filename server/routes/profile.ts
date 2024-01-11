const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerModel from "../models/worker";

router.get("/:id",asyncMiddleware(
    async (req: any, res: any) => {
        const id = req.params.id
        console.log('id',id)
        const user = await WorkerModel.findById(id).select("-password"); //select that mean exclude
       if(user === null){
        return res.status(400).json({message : "user dosin't exist "})
       }
        res.json({ user: user });
  })
  );

module.exports = router




// router.get('/:id/pictures',asyncMiddleware(
//     async(req:any , res:any )=>{
//         const profile = await ProfilesModels.findById(req.body._id) 
//         if(!profile) return res.status(400).json({message:'Profile dont exist'})
//         return res.status(200).json({profile})
//     }
// ))