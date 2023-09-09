import mongoose from "mongoose";
import { User } from "./users";

interface Worker extends User {
    workName:String,
    discreption:String,
    photo:String,
    team:Boolean,
    experience:Number
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
      photo:String,
      team:Boolean,
      experience:Number
})

const WorkerModel = mongoose.model("Worker",workerSchema);

export default WorkerModel
