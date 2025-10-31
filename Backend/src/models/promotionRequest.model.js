const mongoose = require("mongoose");

const promotionRequestSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator", // references the creator who made the request
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PromotionRequest", promotionRequestSchema);
