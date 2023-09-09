import mongoose from "mongoose";
export interface User {
  firstName:String,
  lastName:String,
  phone:Number,
  password:String,
  state:String,
  delegation:String,
  possition:String,
  date:Date,
  isAdmin:Boolean,
}



const userSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  delegation:{
    type : String,
    required : true
  },
  possition:{
    type:String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
  },
  
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
