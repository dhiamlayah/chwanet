const mongoose = require("mongoose");
const  urlDataBase = process.env.urlDataBase;

import logger from "../Logger/winston" ;

const connectWithDataBase = async () => {
    try {
      await mongoose
        .connect(urlDataBase)
        .then(console.log("we connect successfuly with dataBase :)"));
    } catch (error: any) {
      logger.error("can't connect with dataBase", error);
    }
  };

  module.exports= connectWithDataBase