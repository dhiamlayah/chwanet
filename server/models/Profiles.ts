import mongoose from "mongoose";

const Publication = {
  images: [
    {
      uri: String,
      alt: String,
     },
  ],
  videos: [
    {
      alt: String,
      url: String,
     },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
};
const Comment ={
    _id:{
        type:String,
     },
    text:{
        type:String,
     },
    date: {
        type: Date,
        default: Date.now,
      },
}

const ProfilesSchema = new mongoose.Schema({
  _id: {
    type: String,
   },
  discreption:String ,
  pictures: [
    {
      profilePhoto: {
        uri: String,
        alt: String,
       },
    },
    {
      coverPicture: [
        {
          uri: String,
          alt: String,
         },
      ],
    },
  ],
  bio: String,
  publications: {
    type: [Publication],
  },
  note:{
    type:Number,
   },
  comments:{
   type: [Comment] 
  }
});

const ProfilesModels = mongoose.model('Profiles',ProfilesSchema)

 export default ProfilesModels