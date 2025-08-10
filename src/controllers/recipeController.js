const Recipe = require("../models/recipeModel");

// Create Recipe
exports.createRecipe = async (req, res) => {
  try {
    const { recipe_name, ingredients_used, protein_g, carbs_g, fiber_g, fat_g } = req.body;

    if (!recipe_name || !ingredients_used) {
      return res.status(400).json({ message: "Recipe name and ingredients used are required" });
    }

    const recipe = await Recipe.create({
      recipe_name,
      ingredients_used,
      protein_g,
      carbs_g,
      fiber_g,
      fat_g
    });

    res.status(201).json({ message: "Recipe created successfully", data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get All Recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json({ data: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Update Recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await recipe.update(req.body);
    res.status(200).json({ message: "Recipe updated successfully", data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
