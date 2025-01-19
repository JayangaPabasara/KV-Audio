import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./route/userRoute.js";

let app = express();

app.use(bodyParser.json());

//database Connetions
let dbUrl =
  "mongodb+srv://jayangapabasara71:HKjBL3RWYLO1cFMJ@cluster0.ex7ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbUrl);
  
let connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection estabilished succefuly!");
}); //end of database connetion code

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server started at 3000");
});
