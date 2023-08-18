const DataBaseError :any = (err:any ,req:any , res:any,next:any  )=>{
    console.log("there is an error", err);
    res.status(500).json({ message: 'somthing failed from the database. ' });
}

module.exports = DataBaseError