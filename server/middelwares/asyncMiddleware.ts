//insted of calling catch try in every route i think to use this middelware who take a function parametter then return a function with try catch 
import { NextFunction, Request,Response } from "express";

const asyncMiddelware = (handler:Function)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            await handler(req,res)
        }catch(error:any){
            next(error) // next that mean we send this error to the midelware ErrorDataBase 
        }
    }
}

module.exports =asyncMiddelware