const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require ('bcrypt')

//dependency
const PORT = process.env.PORT,
  userDataBase = process.env.userDataBase,
  passwordDataBase = process.env.passwordDataBase,
  projectName = process.env.projectName;
//connect with dataBase
try {
  mongoose
    .connect(
      `mongodb+srv://${userDataBase}:${passwordDataBase}@team.qwomjdl.mongodb.net/${projectName}?retryWrites=true&w=majority`
    )
    .then(console.log("we connect successfuly with dataBase :)"));
} catch (error: any) {
  console.log("can not connect with dataBase", error.response);
}

//import user model
import UserModel from "./models/users";

//midelwers 
app.use(express.json())
app.use(express.urlencoded())

//routers
app.post("/register", async(req:any , res:any) => {
    const {firstName,lastName , email,age,password} = req.body
    const user=await UserModel.findOne({email})

    if(user){
        return res.status(400).json({ message : "User already exist !!"})
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            age,
        })
        await newUser.save()
        return res.status(200).json({message:"user created successfuly"})
    }catch(error:any){
        console.log('there is an error to add new user',error.response)
    }


});

app.listen(PORT, () => {
  console.log(`port is listen in ${PORT}`);
});
