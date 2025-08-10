const UserHealthProfile = require("../models/userHealthProfileModel");

exports.createUserHealthProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { age, gender, height, weight, activityLevel, healthGoal } = req.body;

    const newProfile = await UserHealthProfile.create({
      userId,
      age,
      gender,
      height,
      weight,
      activityLevel,
      healthGoal,
    });

    res.status(201).json({
      message: "User health profile created successfully",
      data: newProfile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json(
      error?.response?.data || {
        message: error.message || "Internal server error",
      }
    );
  }
};

exports.updateUserHealthProfile = async (req, res) => {
  const validGenders = ["Male", "Female", "Other"];
  const validActivityLevels = [
    "Sedentary", "Lightly Active", "Moderately Active",
    "Very Active", "Super Active"
  ];
  const validHealthGoals = [
    "Lose Weight", "Maintain Weight", "Gain Muscle",
    "Improve Endurance", "Improve Flexibility", "General Fitness"
  ];
  try {
    const userId = req.user.id;
    const existingProfile = await UserHealthProfile.findOne({ where: { userId } });

    if (!existingProfile) {
      return res.status(404).json({ message: "Health profile not found" });
    }

    const updateData = {};

    if (req.body.age !== undefined) {
      if (req.body.age < 0) return res.status(400).json({ message: "Age cannot be negative" });
      updateData.age = req.body.age;
    }

    if (req.body.gender !== undefined) {
      if (!validGenders.includes(req.body.gender)) {
        return res.status(400).json({ message: "Invalid gender value" });
      }
      updateData.gender = req.body.gender;
    }

    if (req.body.height !== undefined) {
      updateData.height = req.body.height;
    }

    if (req.body.weight !== undefined) {
      updateData.weight = req.body.weight;
    }

    if (req.body.activityLevel !== undefined) {
      if (!validActivityLevels.includes(req.body.activityLevel)) {
        return res.status(400).json({ message: "Invalid activity level value" });
      }
      updateData.activityLevel = req.body.activityLevel;
    }

    if (req.body.healthGoal !== undefined) {
      if (!validHealthGoals.includes(req.body.healthGoal)) {
        return res.status(400).json({ message: "Invalid health goal value" });
      }
      updateData.healthGoal = req.body.healthGoal;
    }

    await existingProfile.update(updateData);

    res.status(200).json({
      message: "User health profile updated successfully",
      data: existingProfile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

exports.getUserHealthProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await UserHealthProfile.findOne({
      where: { userId },
    });

    res.status(200).json({
      message: "User health profile fetch successfully",
      data: data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json(
      error?.response?.data || {
        message: error.message || "Internal server error",
      }
    );
  }
};
