"use client";

import { useEffect, useState } from "react";
import Navbar from "../Navbar"; // Import the Navbar component

interface Review {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch reviews for the logged-in user
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews/user", {
          credentials: "include", // Include cookies for authentication
        });
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Filter reviews based on the search query
  const filteredReviews = reviews.filter((review) =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />

      <div className="pt-16 px-8">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search your reviews..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold">{review.title}</h3>
              <p className="text-gray-600 mt-2">{review.content}</p>
              <p className="text-sm text-gray-400 mt-4">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredReviews.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No reviews found.</p>
        )}
      </div>
    </div>
  );
}