import express from 'express';
import { config } from "dotenv";
import mongoose from "mongoose";
import "express-async-errors"
import cookieParser from "cookie-parser";
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";


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
app.use(cookieParser());
app.use(express.json()); //parse json data from request body to object in req.body property.

// routes middleware
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

app.use(notFound)
app.use(errorHandlerMiddleware);



app.listen(8800, async () => {
  await connect();
  console.log("Connected to backend.");
});
