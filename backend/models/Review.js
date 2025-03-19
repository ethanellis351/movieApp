import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    movieId: { type: String, requred: true},
    user: { type: String, required: true},
    rating: { type: Number, required: true, min: 0, max: 10 },
    reviewText: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;