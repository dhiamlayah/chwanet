const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//middelwares
const auth = require("./middelwares/authorization");
const admin = require("./middelwares/admin")
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
      { _id: newUser._id , isAdmin: newUser.isAdmin },
      process.env.access_token_secret
    );
    res.setHeader("token", token);
    return res.status(200).json({ message: "user created successfuly" });
  } catch (error: any) {
    console.log("there is an error to add new user", error.response);
    res.status(400).json({ message: error.response });
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
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.access_token_secret
      ); // two parameters user id and secrete
      res.setHeader("token", token);
      res.status(200).json({ message: "user login successfuly" });
    }
  } catch (error: any) {
    console.log("there is a problem to login ", error);
    res.status(400).json({ message: error });
  }
});

//? to get the current user
app.get("/me", auth, async (req: any, res: any) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password"); //select that mean exclude
    res.json({ user: user });
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

app.post("/try", [auth,admin], (req: any, res: any) => {
  res.json({ message: "is an admin " });
});

app.listen(PORT, () => {
  console.log(`port is listen in ${PORT}`);
});
