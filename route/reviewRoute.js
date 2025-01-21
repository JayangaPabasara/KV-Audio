import express from 'express';
import { addReview, approveReview, deleteReview, getReview } from '../controller/reviewController.js';

const reviewRoute = express.Router();

reviewRoute.post("/", addReview);
reviewRoute.get("/read", getReview);
reviewRoute.delete("/:email", deleteReview);
reviewRoute.put("/approve/:email", approveReview);

export default reviewRoute;