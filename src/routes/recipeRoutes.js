const express = require("express");
const { getUserDetails } = require("../middleware/getUserDetails");
const { createRecipe, updateRecipe, getAllRecipes } = require("../controllers/recipeController");

const router = express.Router();

router.post("/create", getUserDetails, createRecipe);
router.post("/update", getUserDetails, updateRecipe);
// router.get("/get-recipe", getUserDetails, getUserHealthProfile);
router.get("/get-all-recipe", getUserDetails, getAllRecipes);

module.exports = router;
