import express from 'express';
import { config } from "dotenv";
import mongoose from "mongoose";
import "express-async-errors"
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import hotelsRoute from "./routes/hotels.js";

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

//middleware
app.use(express.json()); //parse json data from request body to object in req.body property.

// routes middleware
app.use("/api/hotels", hotelsRoute);

app.use(notFound)
app.use(errorHandlerMiddleware);



app.listen(8800, async () => {
  await connect();
  console.log("Connected to backend.");
});
