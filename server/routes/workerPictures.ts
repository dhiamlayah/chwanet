export { };

import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const asyncMiddelware = require("../middelwares/asyncMiddleware");
const auth = require("../middelwares/authorization");
const upload = require("../middelwares/multer");
const resizeImages = require("../middelwares/resizeImages");
const fs = require("fs");

import ProfilesModels, { picture } from "../models/ProfilesPictures";

const convertToDateObject = (dateTimeString: string) => {
  return new Date(dateTimeString);
};

const sortPicturesByDate = (allPictures: any) => {
  return allPictures.sort((a: any, b: any) => {
    const dateA = convertToDateObject(a.date).valueOf();
    const dateB = convertToDateObject(b.date).valueOf();
    return dateB - dateA;
  });
};

const searchImageIfExist = (picturesList: picture[], picture: string) => {
  const searchPicture = picturesList.filter((p) => {
    if (p.picture.filename === picture) {
      return p;
    }
  });
  if (searchPicture.length > 0) {
    return picturesList.indexOf(searchPicture[0]);
  }
  return -1;
};

router.post(
  "/",
  auth,
  upload.single("file"),
  resizeImages,
  asyncMiddelware(async (req: Request, res: Response) => {
    const discreption = JSON.parse(req.body.discreption);
    const imageResized = res.locals.imageResized;
    const date = new Date();
    const workerId = res.locals.user._id;
    const worker = await ProfilesModels.findById({ _id: workerId });
    if (!worker) {
      const FirstWorkerPicture = new ProfilesModels({
        _id: workerId,
        pictuers: [
          {
            descreption: discreption,
            picture: {
              filename: imageResized.filename,
              destination: imageResized.destination,
            },
            date: date.toUTCString(),
          },
        ],
      });
      await FirstWorkerPicture.save();
      res.status(200).json({ message: "successfuly" });
    } else {
      const workerPictures = worker.pictuers;
      if (workerPictures) {
        const pictureExist = searchImageIfExist(
          workerPictures,
          imageResized.filename
        );
        if (pictureExist !== -1) {
          workerPictures.splice(pictureExist, 1);
        }
        workerPictures?.push({
          descreption: discreption,
          picture: {
            filename: imageResized.filename,
            destination: imageResized.destination,
          },
          date: date.toUTCString(),
        });
        await worker.updateOne({ pictuers: workerPictures });
        await worker.save();
        res.status(200).json({ message: "added successfuly" });
      }
    }
  })
);

router.get(
  "/:id",
  asyncMiddelware(async (req: Request, res: Response) => {
    const workerId = req.params.id;
    const startFrom = req.query.startFrom || 0;
    const endIn = req.query.endIn || 0;

    const worker = await ProfilesModels.findById({ _id: workerId });
    if (!worker) {
      res.status(400).json({ message: "لا توجد صور بعد" });
    } else {
      const sortPictuers = sortPicturesByDate(worker.pictuers);
      if (sortPictuers.length === 0) {
        return res.status(400).json({ message: "لا توجد صور بعد" });
      }
      res
        .status(200)
        .json({
          pictures: sortPictuers.slice(startFrom, endIn),
          length: sortPictuers.length,
        });
    }
  })
);

router.delete(
  "/",
  auth,
  asyncMiddelware(async (req: Request, res: Response) => {
    const workerId = res.locals.user._id;
    const ImageFileName = req.body.fileName;
    const findWorker = await ProfilesModels.findById({ _id: workerId });
    if (!findWorker) {
      return res.status(400).send({ message: "لم يتم العثور على العامل" });
    }
    const newPicturesList = findWorker.pictuers?.filter(
      (p) => p.picture.filename !== ImageFileName
    );
    if (newPicturesList?.length === findWorker.pictuers?.length) {
      return res.status(400).send({ message: "الصورة غير موجودة" })
    }
    fs.rmSync(`userPicture/${workerId}/${ImageFileName}`, {
      force: true,
    }); // delete the tmp file as now have buffer
    await findWorker.updateOne({ pictuers: newPicturesList });
    await findWorker.save;
    res.status(200).json({ message: "deleted successfuly" });
  })
);

module.exports = router;
