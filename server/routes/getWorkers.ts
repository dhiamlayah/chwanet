import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middelwares/asyncMiddleware");
import WorkNameModel from "../models/WorkName";
import UserModel from "../models/users";
import WorkerModel from "../models/worker";

interface WorkerInformation {
  [key: string]: string;
}

router.post(
  "/",
  asyncMiddleware(async (req: Request, res: Response) => {
    const page = req.query.page  ;
    let sortBy : "null" |   "Rate.length" |   "Rate.rate"  ="null"
    const limit = req.query.limit;
    const startIndex = (Number(page) - 1) * Number(limit);
    const filterBy = req.body;
    let sendFilter: WorkerInformation = {};
    let sortQuery :any = {};
    if(req.query.sortBy === "length" ){
      sortBy = "Rate.length"
    }
    else if (req.query.sortBy === "rate" ){
      sortBy =  "Rate.rate" 
    }

    sortQuery[sortBy] = "desc";

    if (filterBy.domain !== "") {
      sendFilter.workName = filterBy.domain;
    }
    if (filterBy.state !== "") {
      sendFilter.state = filterBy.state;
      if (filterBy.delegation !== "") {
        sendFilter.delegation = filterBy.delegation;
      }
    }

    let seachDataFromDataBase: Array<object> = [
      {
        ...{ firstName: { $regex: filterBy.search, $options: "i" } },
        ...sendFilter,
      },
      {
        ...{ lastName: { $regex: filterBy.search, $options: "i" } },
        ...sendFilter,
      },
    ];
    const [name, familyName] = filterBy.search.split(" ");
    if (name) {
      seachDataFromDataBase.push({
        ...{ firstName: { $regex: name, $options: "i" } },
        ...sendFilter,
      });
    }
    if (familyName) {
      seachDataFromDataBase.push({
        ...{ firstName: { $regex: familyName, $options: "i" } },
        ...sendFilter,
      });
    }

    const allWorkers = await WorkerModel.find({
      $or: seachDataFromDataBase,
      $and: [ { photo: { $ne: null } }, { workName: { $ne: "أخرى (أريد إضافة عملي)" } } ] 
    })
      .countDocuments();
    const Workers = await WorkerModel.find(
      {
        $or: seachDataFromDataBase,
        $and: [ { photo: { $ne: null } }, { workName: { $ne: "أخرى (أريد إضافة عملي)" } } ]
      },
      "photo firstName workName phone lastName Rate",
    ).sort(sortQuery)

    
     const newTable=  await Workers.slice(startIndex,Number(page) * Number(limit))
    res.status(200).send({ Workers:newTable, numberOfWorkers: allWorkers });
  })
);


//this route to get the length of workers,workName and users models
router.get('/length',asyncMiddleware(
  async(req:Request,res:Response)=>{
    const lengthWorkers = await WorkerModel.countDocuments()
    const lengthClients = await UserModel.countDocuments()
    const lengthWorkNames = await WorkNameModel.countDocuments()
    res.status(200).send({lengthWorkers,lengthClients,lengthWorkNames})
  }
))

 

module.exports = router;
