const Ingredient = require("../models/ingredientsModel");

// Create Ingredient
exports.createIngredient = async (req, res) => {
  try {
    const { name, protein_g, carbs_g, fiber_g, fat_g, vitamins, minerals } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Ingredient name is required" });
    }

    const ingredient = await Ingredient.create({
      name,
      protein_g,
      carbs_g,
      fiber_g,
      fat_g,
      vitamins,
      minerals
    });

    res.status(201).json({ message: "Ingredient created successfully", data: ingredient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get All Ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json({ data: ingredients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Update Ingredient
exports.updateIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.id;
    const ingredient = await Ingredient.findByPk(ingredientId);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    await ingredient.update(req.body);
    res.status(200).json({ message: "Ingredient updated successfully", data: ingredient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
