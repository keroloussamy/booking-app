import express from 'express';
import { config } from "dotenv";
import mongoose from "mongoose";

const app = express();
config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => { //Just listen when the connection is disconnected
  console.log("mongoDB disconnected!");
});


app.listen(8800, async () => {
  await connect();
  console.log("Connected to backend.");
});
