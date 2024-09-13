import { NextFunction ,Request ,Response } from "express"

const admin = (req:Request ,res:Response , next:NextFunction)=>{
    // 401 Unauthorized 
    // 403 Forbidden
    if(!res.locals.user.isAdmin) return res.status(403).json({message : 'Access denied'})
    next()
}
module.exports= admin