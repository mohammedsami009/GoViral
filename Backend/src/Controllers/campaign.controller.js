const Campaign = require("../models/campaign.model");

// ================================
// CREATE CAMPAIGN (Creator only)
// ================================
exports.createCampaign = async (req, res) => {
  try {
    const { name, promoter, price, followers, engagement } = req.body;

    if (!name || !promoter || !price || !followers || !engagement) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get creator ID from token (stored in req.creator by middleware)
    const creatorId = req.creator?._id?.toString() || req.creatorId;

    const campaign = await Campaign.create({
      name,
      promoter,
      creator: req.creator._id.toString(),
      price,
      followers,
      engagement,
      status: "Requested",
      creator: creatorId, // optional — if you removed from schema, skip this line
    });

    res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    console.error("❌ Create Campaign Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================================
// GET CREATOR CAMPAIGNS
// ================================
exports.getCreatorCampaigns = async (req, res) => {
  try {
    const creatorId = req.creator?._id?.toString() || req.creatorId;
    const campaigns = await Campaign.find({ creator: creatorId });

    res.status(200).json({ campaigns });
  } catch (error) {
    console.error("❌ Get Creator Campaigns Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================================
// GET PROMOTER CAMPAIGNS
// ================================
exports.getPromoterCampaigns = async (req, res) => {
  try {
    const promoterId = req.promoter?._id?.toString() || req.promoterId;
    const campaigns = await Campaign.find({ promoter: promoterId });

    res.status(200).json({ campaigns });
  } catch (error) {
    console.error("❌ Get Promoter Campaigns Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================================
// UPDATE CAMPAIGN STATUS (Promoter)
// ================================
exports.updateCampaignStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Requested", "Accepted", "Posted", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({
      message: "Campaign status updated successfully",
      updatedCampaign,
    });
  } catch (error) {
    console.error("❌ Update Campaign Status Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================================
// DELETE CAMPAIGN (Creator only)
// ================================
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Campaign.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Campaign Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
