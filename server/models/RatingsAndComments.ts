import mongoose from "mongoose";

type Comment ={
    text: string,
    date: string , 
}

type ClientRateAndComments ={
    _id:String,
    Comments:Comment[] ,
    Rate:number
}

interface WorkerRatingsAndComments {
    _id:String,
    Clients:ClientRateAndComments[] | null ,
}

const WorkerRatingsAndComments = new mongoose.Schema <WorkerRatingsAndComments> ({
    _id:{
        type:String,
        required:true, 
    },
    Clients: {
        type:Object ,
        required:false,
    }
})

const WorkerRatingsAndCommentsModel = mongoose.model("RatingsAndComments", WorkerRatingsAndComments);


export default WorkerRatingsAndCommentsModel