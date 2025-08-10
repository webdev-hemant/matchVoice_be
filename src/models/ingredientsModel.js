const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const IngredientModel = sequelize.define("Ingredient", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
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
  },
  vitamins: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  minerals: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "ingredients",
  timestamps: false // Disable if you don’t use createdAt/updatedAt
});

module.exports = IngredientModel;