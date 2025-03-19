import express from "express";
import { getPopularMovies, getMovieDetails } from "../utils/tmdb.js";

const router = express.Router();

// Get top 50 popular movies in the USA
router.get("/popular", async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json({ movies });
  } catch (error) {
    console.error("Error in /popular route:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// Get movie details
router.get("/:id", async (req, res) => {
  const movie = await getMovieDetails(req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

export default router;