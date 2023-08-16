const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//middelwares 
const auth = require('./middelwares/authorization')

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
app.use(express.json());
app.use(express.urlencoded());

//routers
app.post("/register", async (req: any, res: any) => {
  const { firstName, lastName, email, age, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist !!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
    });
    await newUser.save();
    const token = jwt.sign(
      { _id: newUser._id },
      process.env.access_token_secret
    );
    return res
      .status(200)
      .json({ Headers: { token }, message: "user created successfuly" });
  } catch (error: any) {
    console.log("there is an error to add new user", error.response);
    res.status(error.response.status).json({ message: error.response.data });
  }
});

app.post("/login", async (req: any, res: any) => {
  const { password, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "invalid email or password" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      !validPassword &&
        res.status(400).json({ message: "password or email incorrect" });
      const token = jwt.sign(
        { _id: user._id },
        process.env.access_token_secret
      ); // two parameters user id and secrete
      res.json({ Headers: { token }, message: "user login successfuly" });
    }
  } catch (error: any) {
    console.log("there is a problem to login ", error);
    res.status(error.response.status).json({ message: error.response.data });
  }
});

app.post("/try",auth,(req:any,res:any)=>{
  res.json({message:' try work successfuly'})
})

app.listen(PORT, () => {
  console.log(`port is listen in ${PORT}`);
});
