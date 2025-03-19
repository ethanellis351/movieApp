import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import movieRoutes from "./routes/movie.js";
import reviewRoutes from "./routes/review.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: "movieReviewDB",
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));