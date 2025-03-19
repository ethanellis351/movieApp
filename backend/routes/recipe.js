import express from "express";
import Recipe from "../models/recipe.js";

const router = express.Router();

// Fetch all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json({ recipes });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

// Create a new recipe
router.post("/", async (req, res) => {
    const { name, ingredients, instructions, prepTime, cookTime, servings } = req.body;

    try {
        const newRecipe = new Recipe({
            name,
            ingredients,
            instructions,
            prepTime,
            cookTime,
            servings,
        });

        await newRecipe.save();
        res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: "Error creating recipe", error });
    }
});

export default router;