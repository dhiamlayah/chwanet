export{}
const mongoose = require("mongoose");
const urlDataBase = process.env.urlDataBase;
const connectWithDataBase = async () => {
  try {
    await mongoose
      .connect(urlDataBase)
      .then(console.log("we connect successfuly with dataBase :)"));
  } catch (error: any) {
    console.log("can't connect with dataBase", error);
  }
};

module.exports = connectWithDataBase;
