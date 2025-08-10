const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserHealthProfile = sequelize.define(
  "UserHealthProfile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true, // 🚀 one-to-one relationship — one profile per user
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activityLevel: {
      type: DataTypes.ENUM(
        "Sedentary",     // little to no exercise
        "Lightly Active", // light exercise/sports 1-3 days/week
        "Moderately Active", // moderate exercise/sports 3-5 days/week
        "Very Active", // hard exercise 6-7 days a week
        "Super Active" // very intense training or physical job
      ),
      allowNull: true,
    },
    healthGoal: {
      type: DataTypes.ENUM(
        "Lose Weight",
        "Maintain Weight",
        "Gain Muscle",
        "Improve Endurance",
        "Improve Flexibility",
        "General Fitness"
      ),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserHealthProfile;
