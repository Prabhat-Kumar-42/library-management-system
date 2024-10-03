const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;

const mongoConnect = async () => {
  await mongoose.connect(mongoUrl);
  console.log("Connected To Database Successfully");
};

module.exports = mongoConnect;
