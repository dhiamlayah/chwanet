import { Response,Request, NextFunction } from "express";

const DataBaseError :any = (err:any ,req:Request , res:Response,next:NextFunction  )=>{
    console.error("there is an error from data base ", err);
    res.status(500).json({ message: 'فشل شيء ما من قاعدة البيانات.' });
}

module.exports = DataBaseError