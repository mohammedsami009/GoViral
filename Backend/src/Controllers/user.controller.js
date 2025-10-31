// src/controllers/user.controller.js
const Creator = require("../models/Creator.model");
const Promoter = require("../models/Promoter.model");

// ===============================
// CREATOR CONTROLLERS
// ===============================

// 🧭 Get Creator Profile (protected)
async function getCreatorProfile(req, res) {
  try {
    // req.creator is attached by authCreatorMiddleware
    const creator = req.creator;
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    res.status(200).json({
      success: true,
      creator,
    });
  } catch (error) {
    console.error("❌ Get Creator Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ✏️ Update Creator Profile (protected)
async function updateCreatorProfile(req, res) {
  try {
    const creatorId = req.creator._id;
    const updates = req.body;

    const updatedCreator = await Creator.findByIdAndUpdate(creatorId, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      creator: updatedCreator,
    });
  } catch (error) {
    console.error("❌ Update Creator Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ===============================
// PROMOTER CONTROLLERS
// ===============================

// 🧭 Get Promoter Profile (protected)
async function getPromoterProfile(req, res) {
  try {
    // req.promoter is attached by authPromoterMiddleware
    const promoter = req.promoter;
    if (!promoter) {
      return res.status(404).json({ message: "Promoter not found" });
    }

    res.status(200).json({
      success: true,
      promoter,
    });
  } catch (error) {
    console.error("❌ Get Promoter Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ✏️ Update Promoter Profile (protected)
async function updatePromoterProfile(req, res) {
  try {
    const promoterId = req.promoter._id;
    const updates = req.body;

    const updatedPromoter = await Promoter.findByIdAndUpdate(promoterId, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      promoter: updatedPromoter,
    });
  } catch (error) {
    console.error("❌ Update Promoter Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getCreatorProfile,
  updateCreatorProfile,
  getPromoterProfile,
  updatePromoterProfile,
};
