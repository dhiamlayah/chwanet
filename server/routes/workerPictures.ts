const express = require('express')
const router = express.Router()
const asyncMiddelwaree = require('../middelwares/asyncMiddleware')
const authorization = require('../middelwares/authorization')
const uploadImag = require('../middelwares/multer')
const resizeImage = require('../middelwares/resizeImages')
router.post("/",
authorization,
uploadImag.single("file"),
resizeImage,
asyncMiddelwaree(
    async (req:any,res:any)=>{
        const imageResized = req.imageResized
        console.log("imageResized",imageResized)
    }
))


module.exports= router