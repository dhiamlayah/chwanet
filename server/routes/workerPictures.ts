export {};

const express = require('express')
const router = express.Router()
const asyncMiddelware = require('../middelwares/asyncMiddleware')
const auth = require('../middelwares/authorization')
const upload = require('../middelwares/multer')
const resizeImages = require('../middelwares/resizeImages')

import ProfilesModels from "../models/ProfilesPictures";


const convertToDateObject = (dateTimeString: string) => {
    return new Date(dateTimeString);
};

const sortPicturesByDate = (allPictures:any)=>{
    return allPictures.sort((a:any, b:any) => {
        const dateA = convertToDateObject(a.date).valueOf();
        const dateB = convertToDateObject(b.date).valueOf();
        return (dateB - dateA);
      })
}


router.post("/",
auth,
upload.single("file"),
resizeImages,
asyncMiddelware(
    async (req:any,res:any)=>{
        const imageResized = req.imageResized
        const date = new Date();
        const workerId = req.user._id
        const worker = await ProfilesModels.findById({ _id:workerId });
        if(!worker){
            const FirstWorkerPicture = new ProfilesModels({
                _id:workerId ,
                pictuers:[
                    {
                        descreption : req.body.descreption,
                        picture :{
                            filename:imageResized.filename,
                            destination:imageResized.destination
                        } ,
                        date :  date.toUTCString()
                }
                ]
          })
          await FirstWorkerPicture.save()
          res.status(200).json({message : "successfuly"})
        }
       else{
        const workerPictures = worker.pictuers
        workerPictures?.push(
            {
                descreption : req.body.descreption,
                picture : {
                     filename:imageResized.filename,
                    destination :imageResized.destination
                },
                date :  date.toUTCString()
        }
        )
        await worker.updateOne({ pictuers: workerPictures });
        await worker.save();
        res.status(200).json({message : "added successfuly"})
       }
    }
))


router.get('/:id',asyncMiddelware(
    async(req:any,res:any)=>{
        const workerId=req.params.id
        const worker = await ProfilesModels.findById({ _id:workerId });
        if(!worker){
            res.status(400).json({message:'no picture yet'})
        }
       else{
        const sortPictuers=sortPicturesByDate(worker.pictuers)
        res.status(200).json({pictures:sortPictuers})
    } }
))

module.exports= router