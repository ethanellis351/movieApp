import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectToDatabase from "./config/mongodb.js";
import movieRoutes from "./routes/movie.js";
import reviewRoutes from "./routes/review.js";

dotenv.config();

// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the frontend
    credentials: true, // Allow cookies and other credentials
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to MongoDB
connectToDatabase();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));