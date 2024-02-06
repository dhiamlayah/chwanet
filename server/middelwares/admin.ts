const admin = (req:any ,res:any , next:any)=>{
    // 401 Unauthorized 
    // 403 Forbidden
        console.log("is admin ",req.user)
    if(!req.user.isAdmin) return res.status(403).json({message : 'Access denied'})
    next()
}
module.exports= admin