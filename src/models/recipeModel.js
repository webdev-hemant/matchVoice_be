const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RecipeModel = sequelize.define("Recipe", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipe_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ingredients_used: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  protein_g: {
    type: DataTypes.REAL,
    allowNull: true
  },
  carbs_g: {
    type: DataTypes.REAL,
    allowNull: true
  },
  fiber_g: {
    type: DataTypes.REAL,
    allowNull: true
  },
  fat_g: {
    type: DataTypes.REAL,
    allowNull: true
  }
}, {
  tableName: "recipes",
  timestamps: false // if your table doesn't have createdAt and updatedAt
});

module.exports = RecipeModel;