import express from "express";
import { getPopularMovies, getMovieDetails } from "../utils/tmdb.js";

const router = express.Router();

// Get popular movies
router.get("/popular", async (req, res) => {
  const movies = await getPopularMovies();
  res.json({ movies });
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