import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./route/userRoute.js";
import productRouter from "./route/productRouter.js";
import jwt, { decode } from "jsonwebtoken";

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

//Authorization with jwt token
app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token != null) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, "kv-secret-89", (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
    });
  }
  next();
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(3000, () => {
  console.log("Server started at 3000");
});
