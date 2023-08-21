const express = require("express");
const app = express();
 

 //winston logger
import logger from "./Logger/winston" ;

//middelwares
const auth = require("./middelwares/authorization");
const admin = require("./middelwares/admin");
const dataBaseError = require("./middelwares/errorDataBase");
 
//dependency
const PORT = process.env.PORT || 3000


//connect with dataBase
 

const connectWithDataBase= require("./connectDataBase/connectWithDataBase")
connectWithDataBase()

//midelwers
app.use(express.json());
 

//Uncaught exceptions 
process.on('uncaughtException',(error:any)=>{
  console.log('Uncaught Exceptions',error)
  logger.error('Uncaught Exceptions ',error)
 })
 
//unhandled rejection 
process.on('unhandledRejection',(error:any)=>{
  console.log('Unhandled Rejection',error)
  logger.error('Unhandled Rejection',error)
 })

//routers
 

const Register = require('./routes/register')
const Login = require('./routes/login')
const Me = require('./routes/me')

app.use('/register',Register)
app.use('/login',Login)
app.use('/me',Me)
 

//? to get the current user
// app.get("/me", auth, asyncMiddleware(
//   async (req: any, res: any) => {
//      const user = await UserModel.findById(req.user._id).select("-password"); //select that mean exclude
//     res.json({ user: user });
 
// })
// );

app.post("/try", [auth, admin], (req: any, res: any) => {
  res.json({ message: "is an admin " });
});

//a middelware for catch errors from the database
app.use(dataBaseError);



// throw new Error("THROW NEW ERROR") 

// const p= Promise.reject(new Error("THROW AN ERROR"))
// p.then(()=>{console.log('DONE')})

app.listen(PORT, () => {
  logger.info(`port is listen in ${PORT}`);
});
