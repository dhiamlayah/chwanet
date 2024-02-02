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
      .where({ photo: { $ne: null } })
      .countDocuments();
    const Workers = await WorkerModel.find(
      {
        $or: seachDataFromDataBase,
      },
      "photo firstName workName phone lastName",
      { skip: startIndex, limit: limit }
    ).where({ photo: { $ne: null } });
    res.status(200).send({ Workers, numberOfWorkers: allWorkers });
  })
);

router.post("/search", async (req: any, res: any) => {
  const query = req.body.search;

  try {
    const results = await WorkerModel.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { workName: { $regex: query, $options: "i" } },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
