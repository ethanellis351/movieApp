import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      title: { type: String, required: true },
      rating: { type: Number, required: true, min: 0, max: 10 },
      reviewText: { type: String, required: true, maxlength: 1000 },
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;