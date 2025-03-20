import express from "express";
import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";

const router = express.Router();

// ✅ Get all reviews for the logged-in user (with pagination)
router.get(
  "/user",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const testUserId = "64a7f8e2b5d6c9a1f0e12345"; // Replace with a valid userId from your database

    const reviews = await Review.find({ userId: testUserId })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalReviews = await Review.countDocuments({ userId: testUserId });

    res.json({
      reviews,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: parseInt(page),
    });
  })
);

// ✅ Get all reviews for a movie (with pagination)
router.get(
  "/:movieId",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ movieId: req.params.movieId })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalReviews = await Review.countDocuments({ movieId: req.params.movieId });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this movie" });
    }

    res.json({
      reviews,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: parseInt(page),
    });
  })
);

// ✅ Post a new review
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { movieId, title, rating, reviewText } = req.body;

    if (!movieId || !title || !rating || !reviewText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 0 || rating > 10) {
      return res.status(400).json({ message: "Rating must be between 0 and 10" });
    }

    const newReview = new Review({
      movieId,
      userId: "64a7f8e2b5d6c9a1f0e12345", // Replace with a valid userId
      title,
      rating,
      reviewText,
    });
    await newReview.save();
    res.status(201).json({ message: "Review added", review: newReview });
  })
);

// ✅ Delete a review
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Temporarily skip user authorization
    await review.remove();
    res.status(200).json({ message: "Review deleted" });
  })
);

export default router;