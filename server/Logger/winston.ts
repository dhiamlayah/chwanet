const winston = require("winston");

require("winston-mongodb");

const urlDataBase = process.env.urlDataBase;

// i choose to log error using two way with dataBase and file 

const logger = winston.createLogger({

    transports: [
    // new winston.transports.File({ filename: 'loggerFileMessages/info.log' ,level:'info'}),
    // new winston.transports.File({ filename: 'loggerFileMessages/error.log' ,level:'error'}),
  //   new winston.transports.MongoDB({
  //     db:  urlDataBase ,
  //     level:'error',
  //     collection:'logging',
  //     options: {
  //       useUnifiedTopology: true,
  //   }
  //   }),
  // ],
 
});

export default logger;
