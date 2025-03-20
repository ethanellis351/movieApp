"use client";

import Head from "next/head";
import Navbar from "../app/Navbar";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules"; // Correct import for Scrollbar
import "swiper/css";
import "swiper/css/scrollbar"; // Import Swiper Scrollbar styles

export default function Home() {
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }

  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch popular movies from the backend
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies/popular");
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging log
        setPopularMovies(data.movies || []); // Access the "movies" key
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <Navbar />
      <Head>
        <title>Moviews</title>
        <meta name="description" content="A place to review movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center h-screen bg-white">
        <h1 className="text-4xl font-bold">Welcome to Moviews!</h1>
        <p className="mt-4 text-lg">Discover and review your favorite movies.</p>
      </section>

      {/* Popular Movies Section with Carousel */}
      <section id="reviews" className="flex flex-col items-center justify-center h-screen bg-white">
        <h2 className="text-3xl font-bold mb-8">Popular Movies</h2>
        <div className="w-full max-w-4xl">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            grabCursor={true}
            modules={[Scrollbar]} // Enable the Scrollbar module
            scrollbar={{ draggable: true }} // Make the scrollbar draggable
          >
            {popularMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="flex flex-col items-center pb-4"> {/* Add padding to the bottom */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg shadow-lg"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-center">{movie.title}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}