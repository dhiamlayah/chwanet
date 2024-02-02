import mongoose from "mongoose";
import { User } from "./users";

export type MulterType = {
  fieldname:String,
  originalname:String,
  encoding:String,
  mimetype:String,
  destination:String,
  filename:String,
  path:String,
  size:Number
}

interface Worker extends User {
    workName:String,
    discreption:String,
    photo:MulterType,
    team:Boolean,
    experience:{rate:number,length:number},
    Rate:Number
}


const workerSchema =new mongoose.Schema<Worker>({
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
      phone: {
        type: Number,
        require: true,
        unique: true,
      },
      password: {
        type: String,
        require: true,
      },
      state: {
        type: String,
        require: true,
      },
      delegation:{
        type : String,
        require : true
      },
      possition:{
        type:String,
        require:true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      isAdmin: {
        type: Boolean,
      },
      workName:{
        type:String,
        require:true
      },
      discreption:{
        type:String,
        require:true,
      },
      photo:{
        type:Object , 
        require:true
      },
      team:Boolean,
      Rate:Object,
      experience:Number
})

const WorkerModel = mongoose.model("Worker",workerSchema);

export default WorkerModel
