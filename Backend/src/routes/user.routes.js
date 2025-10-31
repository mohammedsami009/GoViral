const express = require("express");
const router = express.Router();
const {
  getCreatorProfile,
  updateCreatorProfile,
  getPromoterProfile,
  updatePromoterProfile,
} = require("../Controllers/user.controller");
const {
  authCreatorMiddleware,
  authPromoterMiddleware,
} = require("../middlewares/auth.middleware");

// ===============================
// CREATOR ROUTES
// ===============================
router.get("/creator/profile", authCreatorMiddleware, getCreatorProfile);
router.put("/creator/profile", authCreatorMiddleware, updateCreatorProfile);

// ===============================
// PROMOTER ROUTES
// ===============================
router.get("/promoter/profile", authPromoterMiddleware, getPromoterProfile);
router.put("/promoter/profile", authPromoterMiddleware, updatePromoterProfile);
// ===============================
// GET ALL PROMOTERS (for creators)
// ===============================
router.get("/promoters", authCreatorMiddleware, async (req, res) => {
  try {
    const promoters = await Promoter.find().select("-password"); // exclude password field
    res.status(200).json({ promoters });
  } catch (error) {
    console.error("❌ Error fetching promoters:", error);
    res.status(500).json({ message: "Failed to fetch promoters" });
  }
});

module.exports = router;
