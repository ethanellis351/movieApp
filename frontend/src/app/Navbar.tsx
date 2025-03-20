"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black bg-opacity-80 backdrop-blur-md fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white"><Link href="/">Moviews</Link></h1>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-white hover:text-blue-500 transition">
            Home
          </Link>
          <Link href="/movies" className="text-white hover:text-blue-500 transition">
            Movies
          </Link>
          <Link href="/reviews" className="text-white hover:text-blue-500 transition">
            Reviews
          </Link>
          <Link href="/profile" className="text-white hover:text-blue-500 transition">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
