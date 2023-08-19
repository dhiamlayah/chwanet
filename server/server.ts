const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//winston logger
const logger = require("./Logger/winston");

//middelwares
const auth = require("./middelwares/authorization");
const admin = require("./middelwares/admin");
const dataBaseError = require("./middelwares/errorDataBase");
const asyncMiddleware = require("./middelwares/asyncMiddleware");
//dependency
const PORT = process.env.PORT,
  urlDataBase = process.env.urlDataBase;
//connect with dataBase
const connectWithDataBase = async () => {
  try {
    await mongoose
      .connect(urlDataBase)
      .then(console.log("we connect successfuly with dataBase :)"));
  } catch (error: any) {
    logger.error("can't connect with dataBase", error);
  }
};

connectWithDataBase();

//import user model
import UserModel from "./models/users";

//midelwers
app.use(express.json());
app.use(express.urlencoded());

//routers
app.post("/register",
  asyncMiddleware(async (req: any, res: any) => {
    const { firstName, lastName, email, age, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist !!" });
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
      { _id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.access_token_secret
    );
    res.setHeader("token", token);
    return res.status(200).json({ message: "user created successfuly" });
  })
);

app.post("/login",
  asyncMiddleware(async (req: any, res: any) => {
    const { password, email } = req.body;
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
  })
);

//? to get the current user
app.get("/me", auth, async (req: any, res: any) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password"); //select that mean exclude
    res.json({ user: user });
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

app.post("/try", [auth, admin], (req: any, res: any) => {
  res.json({ message: "is an admin " });
});

//a middelware for catch errors from the database
app.use(dataBaseError);

app.listen(PORT, () => {
  console.log(`port is listen in ${PORT}`);
});
