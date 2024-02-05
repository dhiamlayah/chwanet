import mongoose from "mongoose";

// this model was created if any worker not find his work name and he want to add it this model was send to the admin for accepting it 

const NewWorkNameSchema = new mongoose.Schema({
  _id:{
    type:String,
    require:true
  },
  newWorkName: {
    type: String,
    required: true,
    unique:true,
  },
});

const NewWorkNameModel = mongoose.model("NewWorkName", NewWorkNameSchema);

export default NewWorkNameModel;
