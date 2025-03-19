"use client";

import { useEffect, useState } from "react";
import Navbar from "../Navbar";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null; // Allow null for missing images
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the 50 most popular movies from the backend
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies/popular");
        const data = await response.json();
        setMovies(data.movies || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />

      {/* Add padding to prevent content from being hidden behind the navbar */}
      <div className="pt-16">
        {/* Search Bar */}
        <div className="flex justify-center mt-8">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Movies List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="flex flex-col items-center">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder-image.png" // Path to your placeholder image
                }
                alt={movie.title}
                className="rounded-lg shadow-lg w-40 h-60 object-cover" // Fixed size and object-fit
              />
              <h3 className="mt-2 text-center text-lg font-semibold">{movie.title}</h3>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMovies.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No movies found.</p>
        )}
      </div>
    </div>
  );
}