const express = require("express");
const app = express();
const connectWithDataBase= require("./connectDataBase/connectWithDataBase")
const cors = require('cors')


const corsOptions = {
  exposedHeaders: 'Token',
};

app.use(cors())
app.use(cors(corsOptions));

//-----------------------dependency-------------------------------------------//
const PORT = process.env.PORT || 3000
 
 //----------------------winston logger-------------------------------------------//
import logger from "./Logger/winston" ;

//-----------------------middelwares-------------------------------------------//
const dataBaseError = require("./middelwares/errorDataBase");
 
//----------------------json form-------------------------------------------//
app.use(express.json());
 

//----------------------connect with dataBase-------------------------------------------//
connectWithDataBase()


//--------------------Uncaught exceptions -------------------------------------------//
process.on('uncaughtException',(error:any)=>{
  console.log('Uncaught Exceptions',error)
  logger.error('Uncaught Exceptions ',error)
 })
//-------------------unhandled rejection -------------------------------------------//
process.on('unhandledRejection',(error:any)=>{
  console.log('Unhandled Rejection',error)
  logger.error('Unhandled Rejection',error)
 })

//---------------------routers-------------------------------------------//
const Register = require('./routes/register')
const Login = require('./routes/login')
const MeAsClient = require('./routes/meAsClient')
const MeAsWorker = require('./routes/meAsWorker')
const Genres = require("./routes/genres")
const Profile= require("./routes/profile")
const GetWorkers = require("./routes/getWorkers")


app.use('/register',Register)
app.use('/login',Login)
app.use('/meAsClient',MeAsClient)
app.use('/meAsWorker',MeAsWorker)
app.use('/genres',Genres)
app.use('/profile',Profile)
app.use('/userPicture', express.static('userPicture'));
app.use('/userPictureBeforResizing', express.static('userPictureBeforResizing'));
app.use('/getWorkers',GetWorkers)

 
//----------------a middelware for catch errors from the database-------------------------------------------//
app.use(dataBaseError);




app.listen(PORT, () => {
  logger.info(`port is listen in ${PORT}`);
});




// throw new Error("THROW NEW ERROR") 

// const p= Promise.reject(new Error("THROW AN ERROR"))
// p.then(()=>{console.log('DONE')})

