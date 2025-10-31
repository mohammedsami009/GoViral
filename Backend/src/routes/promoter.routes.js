const express = require("express");
const router = express.Router();
const promoterController = require("../Controllers/promoter.controller");

// ✅ Route for the “Find Promoters” page
router.get("/", promoterController.getAllPromoters);

// Optional: Fetch single promoter profile
router.get("/:id", promoterController.getPromoterById);

module.exports = router;
