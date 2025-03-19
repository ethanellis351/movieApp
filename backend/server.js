import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipe.js"; 

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

mongoose.connect(process.env.MONGODB_URI, {
  dbName: "recipeAI",
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Register routes
app.use("/api/recipes", recipeRoutes);

// Root route for testing
app.get("/", (req, res) => res.send("Welcome to Recipe AI!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));