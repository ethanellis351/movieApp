import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: { api_key: TMDB_API_KEY, language: "en-US" },
});

// Fetch popular movies in the USA
export const getPopularMovies = async () => {
  try {
    const response = await tmdbApi.get("/movie/popular", {
      params: { region: "US" }, // Add region parameter
    });
    return response.data.results.slice(0, 50); // Limit to top 50 movies
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

// Fetch movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie ${movieId}:`, error);
    return null;
  }
};