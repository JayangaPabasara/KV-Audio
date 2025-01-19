import express from "express";
import { loginUser, register } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", register);
userRouter.post("/login", loginUser);

export default userRouter;