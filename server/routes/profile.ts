const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import ProfilesModels from "../models/Profiles";

router.get('/:id',asyncMiddleware(
    async(req:any , res:any )=>{
        const profile = await ProfilesModels.findById(req.body._id) 
        if(!profile) return res.status(400).json({message:'Profile dont exist'})
        return res.status(200).json({profile})
    }
))

module.exports = router 