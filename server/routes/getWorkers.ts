const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middelwares/asyncMiddleware");
import WorkerModel from "../models/worker";

interface WorkerInformation {
  [key: string]: string;
}

router.post(
  "/",
  asyncMiddleware(async (req: any, res: any) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const filterBy = req.body;
    let sendFilter: WorkerInformation = {};
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
    })
.where({ $and: [ { photo: { $ne: null } }, { workName: { $ne: "أخرى (أريد إضافة عملي)" } } ] })
      .countDocuments();
    const Workers = await WorkerModel.find(
      {
        $or: seachDataFromDataBase,
      },
      "photo firstName workName phone lastName Rate",
      { skip: startIndex, limit: limit }
    ).where({ $and: [ { photo: { $ne: null } }, { workName: { $ne: "أخرى (أريد إضافة عملي)" } } ] })
    res.status(200).send({ Workers, numberOfWorkers: allWorkers });
  })
);

 

module.exports = router;
