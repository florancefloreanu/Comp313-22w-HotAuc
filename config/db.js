/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\config\db.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack
 * Created Date: Wednesday, February 23rd 2022, 12:19:53 pm
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Connect mongoDB
 */


const mongoose = require("mongoose");

//Config .env
require("dotenv").config();
// require("dotenv").config()
require("dotenv").config({ path: __dirname + "/../env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
