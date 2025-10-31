const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    promoter: {
      type: String,
      required: false,
      trim: true,
    },
    creator: {
      type: String, // will store creator._id as a string
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Requested", "Accepted", "Posted", "Completed"],
      default: "Requested",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    followers: {
      type: String,
      required: true,
    },
    engagement: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
