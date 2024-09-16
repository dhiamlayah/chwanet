import { Request,Response } from "express";
const express = require('express')
const router = express.Router()
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerModel from "../models/worker";

router.get("/:id",asyncMiddleware(
    async (req: Request, res: Response) => {
        const id = req.params.id
        if(id === "me"){
           return res.status(400).json({message : "current worker"})
        }
        const user = await WorkerModel.findById(id).select("-password"); //select that mean exclude
       if(user === null){
         return res.status(400).json({message : "user dosin't exist "})
       }
        res.json({ user: user });
  })
  );



router.get("/:id/Rate",asyncMiddleware(
  async (req: Request, res: Response) => {
      const id = req.params.id
      const user = await WorkerModel.findById(id).select("Rate");
     if(user === null){
      return res.status(400).json({message : "user dosin't exist "})
      }
      res.status(200).json(user.Rate);
})
);

module.exports = router

