 import mongoose from "mongoose"
 const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now
    }
 })

 const UserModel = mongoose.model("Users",userSchema)
 
 export default UserModel