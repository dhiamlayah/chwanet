import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
