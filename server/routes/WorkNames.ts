export { }

import { Request ,Response } from "express";
const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");
const auth = require("../middelwares/authorization");
const admin = require("../middelwares/admin");

import WorkNameModel from "../models/WorkName";

router.post("/", auth, admin, asyncMiddleware(
    async (req: Request, res: Response) => {
        const { name } = req.body
        const WorkName = await WorkNameModel.findOne({ name })
        if (WorkName) return res.status(400).json({ message: 'Work name already exist' })
        const newGenre = new WorkNameModel({
            name,
        })
        await newGenre.save()
        return res.status(200).json({ message: 'Work name  created successfuly' })
    }
))

router.get('/', asyncMiddleware(
    async (_: any, res: Response) => {
        const workNames = await WorkNameModel.find({}, "name")
        if (workNames.length === 0) return res.status(200).json({ message: 'there is no WorkName right now' })
        return res.status(200).json({ workNames })
    }

))

module.exports = router