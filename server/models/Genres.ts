import mongoose from "mongoose";
const GenresSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
  },
  images: [
    {
      url: {
        type: String,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
  ],
});

const GenresModel = mongoose.model("Genres", GenresSchema);

export default GenresModel;
