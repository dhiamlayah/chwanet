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
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  region: [
    {
      state: {
        type: String,
        require: true,
      },
    },
    {
      accreditation: {
        type: String,
        require: true,
      },
    },
    {
      otherAccrediations: {
        type: [String],
      },
    },
  ],
  userType:{
    type:String,
    require:true,
  },
  age: {
    type: Number,
    require: true,
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
