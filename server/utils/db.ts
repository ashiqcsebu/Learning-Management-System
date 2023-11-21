import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URL || "";

const ConnectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database Conncted to ${data.connncet.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(ConnectDB, 5000);
  }
};

export default ConnectDB;