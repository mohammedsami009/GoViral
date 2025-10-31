const Promoter = require("../models/Promoter.model");

// ✅ Get all promoters
exports.getAllPromoters = async (req, res) => {
  try {
    const promoters = await Promoter.find().select(
      "fullName instagramHandle followerCount averageViews niche price"
    );
    res.status(200).json(promoters);
  } catch (error) {
    console.error("Error fetching promoters:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get promoter by ID (optional — for profile details)
exports.getPromoterById = async (req, res) => {
  try {
    const promoter = await Promoter.findById(req.params.id);
    if (!promoter) {
      return res.status(404).json({ message: "Promoter not found" });
    }
    res.status(200).json(promoter);
  } catch (error) {
    console.error("Error fetching promoter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
