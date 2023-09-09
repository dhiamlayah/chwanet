const express = require('express')
const router= express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const auth = require("../middelwares/authorization");
const admin = require("../middelwares/admin");

import GenresModel from "../models/Genres";

router.post("/",auth,admin,asyncMiddleware(
    async(req:any,res:any)=>{
        const {name,category,images} = req.body
        const genres = await GenresModel.findOne({name})
        if(genres)return res.status(400).json({message : 'Genre already exist'})
        const newGenre = new GenresModel({
            name,
            category,
            images,
        })
        await newGenre.save()
        return res.status(200).json({message:'genre created successfuly'})
    }
))

router.get('/',asyncMiddleware(
     async(req:any,res:any)=>{
       const genres =await GenresModel.find()
       if(genres.length===0)return res.status(200).json({message:'there is no genre right now'})
       return res.status(200).json({message:genres}) 
    }

))

module.exports = router