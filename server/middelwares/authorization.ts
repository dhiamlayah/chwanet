import { Response,Request, NextFunction } from "express";

const jwt = require("jsonwebtoken");

function auth(req: Request, res: Response, next: NextFunction) {
  const token =req.headers['token']
   if (!token) {
   return  res.status(401).json({ message: "access denied.No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    res.locals.user = decoded
    next()
  } catch (error: any) {
    res.status(400).json({ message: "invalid token"});
  }
}


module.exports=auth 