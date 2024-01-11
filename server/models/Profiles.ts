import mongoose from "mongoose";

import { MulterType } from "./worker";
type picture = {
    descreption:string ,
    picture :MulterType,
    date: string 
}

 interface ProfilePictures {
  _id: string,
  pictuers:picture[] | null
 }


const ProfilesSchema = new mongoose.Schema<ProfilePictures>({
   _id :{
      type:String,
      require: true,
    },
   pictuers:{
      type:Object,
      require:false
   }
});

const ProfilesModels = mongoose.model('ProfilesPictures',ProfilesSchema)

 export default ProfilesModels