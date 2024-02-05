import mongoose from "mongoose";
const WorkNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
});

const WorkNameModel = mongoose.model("WorkName", WorkNameSchema);

export default WorkNameModel;
