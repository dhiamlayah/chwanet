import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerRatingsAndCommentsModel, {
  ClientRateAndComments,
} from "../models/RatingsAndComments";

import UserModel from "../models/users";

const getClients = async (Clients: ClientRateAndComments[]) => {
  return await Promise.all(
    Clients.map(async (client) => {
      if (client.Comment) {
        const clientName = await UserModel.findOne({ _id: client._id });
        if (clientName)
          return {
            _id: client._id,
            Comment: client.Comment,
            Rate: client.Rate,
            firstName: clientName.firstName,
            lastName: clientName.lastName,
          };
        return { _id: client._id, Comment: client.Comment, Rate: client.Rate,firstName:'في انتظار ',lastName:"الاسم" };
      }
      return null;
    })
  );
};

const convertToDateObject = (dateTimeString: any) => {
  return new Date(dateTimeString);
};

const sortClientsCommentByDate = (
  allClientsComment: any
) => {
  return allClientsComment.sort((a: any, b: any) => {
    const dateA = convertToDateObject(a.Comment.date).valueOf();
    const dateB = convertToDateObject(b.Comment.date).valueOf();
    return dateB - dateA;
  });
};


// this path for client to make a Comments
router.put(
  "/",
  auth,
  asyncMiddleware(async (req: Request, res: Response) => {
    const clientComment = req.body.Comment;
    const clientId: string = res.locals.user._id;
    const workerId = req.body.workerId;
    const worker = await WorkerRatingsAndCommentsModel.findOne({
      _id: workerId,
    });
    const date = new Date();
    if (worker) {
      let allClients = worker?.Clients;
      const findClient = allClients?.find((e) => {
        if (e._id === clientId) return e;
      });

      if (findClient !== undefined) {
        const updateClients = allClients?.map((client) => {
          if (client._id === findClient._id) {
            client.Comment = {
              text: clientComment,
              date: date.toUTCString(),
            };
          }
          return client;
        });
        await worker?.updateOne({ Clients: updateClients });
        await worker?.save();
        res.status(200).send("successfuly");
      } else {
        allClients?.push({
          _id: clientId,
          Comment: { text: clientComment, date: date.toUTCString() },
          Rate: null,
        });
        await worker?.updateOne({ Clients: allClients });
        await worker?.save();
        res.status(200).send("successfuly");
      }
    } else {
      res.status(400).send({ message: "فشل في العثور على العامل" });
    }
  })
);

//this path to get worker Comments
router.get(
  "/:id",
  asyncMiddleware(async (req: Request, res: Response) => {
    const id = req.params.id;
    const idWorker = await WorkerRatingsAndCommentsModel.findOne({ _id: id });
    if (idWorker) {
      const Clients = idWorker.Clients;
      if (Clients) {
        const allComments = await getClients(Clients);
        const filterClients  = allComments.filter((client) => client !== null);

        if (filterClients.length > 0 ) {
          const clientSplited = sortClientsCommentByDate(filterClients);
          return res.status(200).json(clientSplited);
        }
        res.status(400).json({ message: "لا يوجد تعليقات حتى الآن  " });
      } else {
        res.status(400).json({ message: "لا يوجد تعليقات حتى الآن  " });
      }
    } else {
      res.status(400).send({ message: "فشل في العثور على العامل" });
    }
  })
);

router.delete("/:id",auth,asyncMiddleware(
  async(req:Request ,res:Response)=>{
        const workerId = req.params.id
        const worker = await WorkerRatingsAndCommentsModel.findById(workerId)
      if (worker && worker.Clients) {
        const newClientsComment : ClientRateAndComments[]  = worker?.Clients.map(
          (client) => {
            if (client._id === res.locals.user._id){
              return {_id : client._id ,Comment:null , Rate :client.Rate}
            }else{
              return client
            }
          }
        );

        await worker.updateOne({Clients:newClientsComment})
        await worker.save()
        res.status(200).send("delete successfuly")
      }else{
        res.status(400).send({message:"فشل في العثور على العامل"})

      }

      
  }
))



module.exports = router;
