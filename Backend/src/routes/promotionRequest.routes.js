const express = require("express");
const router = express.Router();
const PromotionRequest = require("../models/promotionRequest.model");
const { authCreatorMiddleware, authPromoterMiddleware } = require("../middlewares/auth.middleware");

// =========================
// CREATE a new promotion request (CREATOR only)
// =========================
router.post("/create", authCreatorMiddleware, async (req, res) => {
  try {
    const { brandName, contentType, price, message } = req.body;
    const creator = req.creator;

    const request = await PromotionRequest.create({
      creator: creator._id,
      creatorName: creator.fullName,
      brandName,
      contentType,
      price,
      message,
      status: "pending",
    });

    res.status(201).json({ message: "Promotion request created", request });
  } catch (error) {
    console.error("❌ Create Promotion Request Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// GET all requests for the logged-in CREATOR
// =========================
router.get("/creator", authCreatorMiddleware, async (req, res) => {
  try {
    const requests = await PromotionRequest.find({ creator: req.creator._id });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// GET all requests (PROMOTER view)
// =========================
router.get("/promoter", authPromoterMiddleware, async (req, res) => {
  try {
    const requests = await PromotionRequest.find().sort({ createdAt: -1 });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// UPDATE request status (ACCEPT / REJECT) — PROMOTER only
// =========================
router.patch("/:id/status", authPromoterMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await PromotionRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Status updated", request });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// DELETE a request (CREATOR only)
// =========================
router.delete("/:id", authCreatorMiddleware, async (req, res) => {
  try {
    const request = await PromotionRequest.findOneAndDelete({
      _id: req.params.id,
      creator: req.creator._id,
    });

    if (!request)
      return res.status(404).json({ message: "Request not found or not authorized" });

    res.json({ message: "Promotion request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
