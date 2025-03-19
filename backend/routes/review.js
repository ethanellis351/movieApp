import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// ✅ Get all reviews for a movie
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// ✅ Post a new review
router.post("/", async (req, res) => {
  const { movieId, user, rating, reviewText } = req.body;

  if (!movieId || !user || !rating || !reviewText) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newReview = new Review({ movieId, user, rating, reviewText });
    await newReview.save();
    res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error saving review", error });
  }
});

// ✅ Delete a review
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
});

export default router;