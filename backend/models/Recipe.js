import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    prepTime: {
        type: Number, // Time in minutes
        required: true
    },
    cookTime: {
        type: Number, // Time in minutes
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;