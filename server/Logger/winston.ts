const winston = require("winston");

require("winston-mongodb");

const urlDataBase = process.env.urlDataBase;

const logger = winston.createLogger({

    transports: [
    new winston.transports.MongoDB({
      db:  urlDataBase ,
      level:'error',
      collection:'logging',
      options: {
        useUnifiedTopology: true,
    }
    })
  ],
});
 

module.exports = logger;
