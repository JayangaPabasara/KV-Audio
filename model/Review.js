import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  profilePicuture: {
    type: String,
    default:
      'https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg'
  },
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
