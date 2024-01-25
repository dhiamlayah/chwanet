const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorization");
const asyncMiddleware = require("../middelwares/asyncMiddleware");

import WorkerRatingsAndCommentsModel, {
  Comment,
  ClientRateAndComments,
} from "../models/RatingsAndComments";

import UserModel from "../models/users";

interface ClientRateAndCommentsAndName extends ClientRateAndComments {
  firstName: string | undefined;
  lastName: string | undefined;
}

const getClients = async (Clients: ClientRateAndComments[]) => {
  return await Promise.all(
    Clients.map(async (client) => {
      if (client.Comments.length > 0) {
        const clientName = await UserModel.findOne({ _id: client._id });
        if (clientName)
          return {
            _id: client._id,
            Comments: client.Comments,
            firstName: clientName.firstName,
            lastName: clientName.lastName,
          };
        return { _id: client._id, Comments: client.Comments };
      }
      return null;
    })
  );
};

const convertToDateObject = (dateTimeString: any) => {
  return new Date(dateTimeString);
};

// this function have object to split each comment then order it by date

const splitComments = (Clients: any) => {
  let allCommentsSplited: any = [];
  Clients.map((client: ClientRateAndCommentsAndName) => {
    client.Comments.map((comment: Comment) => {
      allCommentsSplited.push({
        _id: client._id,
        text: comment.text,
        name: client.firstName + " " + client.lastName,
        date: comment.date,
      });
    });
  });
  return allCommentsSplited.sort((a: any, b: any) => {
    const dateA = convertToDateObject(a.date).valueOf();
    const dateB = convertToDateObject(b.date).valueOf();
    return dateB - dateA;
  });
};

// this path fo client to make a Comments
router.put(
  "/",
  auth,
  asyncMiddleware(async (req: any, res: any) => {
    const clientComment = req.body.Comment;
    console.log("client Comment", clientComment);
    const clientId: string = req.user;
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
            client.Comments.push({
              text: clientComment,
              date: date.toUTCString(),
            });
          }
          return client;
        });
        await worker?.updateOne({ Clients: updateClients });
        await worker?.save();
        res.status(200).send("successfuly");
      } else {
        allClients?.push({
          _id: clientId,
          Comments: [{ text: clientComment, date: date.toUTCString() }],
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
  asyncMiddleware(async (req: any, res: any) => {
    const id = req.params.id;
    const idWorker = await WorkerRatingsAndCommentsModel.findOne({ _id: id });
    if (idWorker) {
      const Clients = idWorker.Clients;
      if (Clients) {
        const allComments = await getClients(Clients);
        const filterClients = allComments.filter((client) => client !== null);

        if (filterClients.length > 0) {
          const clientSplited = splitComments(filterClients);
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

module.exports = router;
