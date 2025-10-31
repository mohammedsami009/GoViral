const mongoose = require("mongoose");

const promoterSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    instagramHandle: {
      type: String,
      required: true,
      unique: true,
    },
    portfolioUrl: {
      type: String,
    },
    followerCount: {
      type: String,
      required: true,
    },
    averageViews: {
      type: String,
      required: true,
    },
    totalInteractions: {
      type: String,
      required: true,
    },
    newFollowersGained: {
      type: String,
      required: true,
    },
    accountsReached: {
      type: String,
      required: true,
    },
    niche: {
      type: String,
      required: true,
    },
    // 👇 ML-predicted price field
    price: {
      type: Number,
      default: 0, // set default to 0 for new documents
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promoter", promoterSchema);
