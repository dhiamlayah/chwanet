export{}
const mongoose = require("mongoose");
const urlDataBase = "mongodb+srv://mlayahdhia:f1CfGH7bwLnBPrOy@team.qwomjdl.mongodb.net/chwanett?retryWrites=true&w=majority";
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
