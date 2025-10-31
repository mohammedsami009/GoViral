const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getCreatorCampaigns,
  getPromoterCampaigns,
  updateCampaignStatus,
  deleteCampaign,
} = require("../Controllers/campaign.controller");
const {
  authCreatorMiddleware,
  authPromoterMiddleware,
} = require("../middlewares/auth.middleware");

// ============ CREATOR ROUTES ============
router.post("/create", authCreatorMiddleware, createCampaign);
router.get("/creator", authCreatorMiddleware, getCreatorCampaigns);
router.delete("/:id", authCreatorMiddleware, deleteCampaign);

// ============ PROMOTER ROUTES ============
router.get("/promoter", authPromoterMiddleware, getPromoterCampaigns);
router.patch("/:id/status", authPromoterMiddleware, updateCampaignStatus);

module.exports = router;
