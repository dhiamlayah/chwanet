const express = require("express");
const app = express();
const connectWithDataBase = require("./connectDataBase/connectWithDataBase");
const cors = require("cors");
const path = require("path");

const corsOptions = {
  exposedHeaders: "Token",
};

app.use(cors());
app.use(cors(corsOptions));

//-----------------------dependency-------------------------------------------//
const PORT = process.env.PORT || 3000;


//-----------------------middelwares-------------------------------------------//
const dataBaseError = require("./middelwares/errorDataBase");

//----------------------json form-------------------------------------------//
app.use(express.json());

//----------------------connect with dataBase-------------------------------------------//
connectWithDataBase();

//--------------------Uncaught exceptions -------------------------------------------//
process.on("uncaughtException", (error: any) => {
  console.log("Uncaught Exceptions", error);
});
//-------------------unhandled rejection -------------------------------------------//
process.on("unhandledRejection", (error: any) => {
  console.log("Unhandled Rejection", error);
});

//---------------------routers-------------------------------------------//
const Register = require("./routes/register");
const Login = require("./routes/login");
const MeAsClient = require("./routes/meAsClient");
const MeAsWorker = require("./routes/meAsWorker");
const WorkNameList = require("./routes/WorkNames");
const Profile = require("./routes/profile");
const GetWorkers = require("./routes/getWorkers");
const RateWoker = require("./routes/RateWorker");
const CommentWorker = require("./routes/CommentWorkers");
const WorkerPictures = require("./routes/workerPictures");
const Admin = require("./routes/Admin");
app.use("/register", Register);
app.use("/login", Login);
app.use("/meAsClient", MeAsClient);
app.use("/meAsWorker", MeAsWorker);
app.use("/workNameList", WorkNameList);
app.use("/profile", Profile);
app.use(
  "/userPictureBeforResizing",
  express.static("userPictureBeforResizing")
);
app.use("/getWorkers", GetWorkers);
app.use("/rateWorker", RateWoker);
app.use("/commentWorker", CommentWorker);
app.use("/workerPictures", WorkerPictures);
app.use("/Admin", Admin);
//----------------static file containe all workers pictures -------------------------------------------//
app.use("/userPicture/:id", (req: any, res: any, next: any) => {
  const userId = req.params.id;
  // Construct the path to the user-specific directory
  const userDirectory = path.join(__dirname, "userPicture", userId);
   // Use express.static middleware to serve files from the user-specific directory
  express.static(userDirectory)(req, res, next);
});

//----------------a middelware for catch errors from the database-------------------------------------------//
app.use(dataBaseError);

app.listen(PORT, () => {
  console.log(`port is listen in ${PORT}`);
});

 