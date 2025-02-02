import express from 'express';
import { addInquire, deleteInquire, getInquires, updateInquire } from '../controller/inquireController.js';

const inquireRoute = express.Router();

inquireRoute.post("/", addInquire);
inquireRoute.get("/", getInquires);
inquireRoute.delete("/:id", deleteInquire);
inquireRoute.put("/:id", updateInquire);

export default inquireRoute;

