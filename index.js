import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./route/userRoute.js";
import productRouter from "./route/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import reviewRoute from "./route/reviewRoute.js";
import dotenv from 'dotenv';
import inquireRoute from "./route/inquireRoute.js";

dotenv.config(); //loard the env files

let app = express();

app.use(bodyParser.json());

//database Connetions
let dbUrl = process.env.MONGO_URL;

mongoose.connect(dbUrl);

let connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection estabilished succefuly!");
}); //end of database connetion code

//Authorization with jwt token
app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token != null) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET_PW, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
    });
  }
  next();
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRoute);
app.use("/api/inquire", inquireRoute);

app.listen(3000, () => {
  console.log("Server started at 3000");
});

