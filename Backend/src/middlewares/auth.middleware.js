const creatorModel = require("../models/Creator.model");
const promoterModel = require("../models/Promoter.model");
const jwt = require("jsonwebtoken");

// ===============================
// PROMOTER AUTH MIDDLEWARE
// ===============================
async function authPromoterMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const promoter = await promoterModel.findById(decoded.id).select("-password");

    if (!promoter) {
      return res.status(401).json({ message: "Unauthorized - Invalid user" });
    }

    // ✅ Removed email verification check
    req.promoter = promoter;
    next();
  } catch (error) {
    console.error("❌ Promoter Auth Error:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
}

// ===============================
// CREATOR AUTH MIDDLEWARE
// ===============================
async function authCreatorMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const creator = await creatorModel.findById(decoded.id).select("-password");

    if (!creator) {
      return res.status(401).json({ message: "Unauthorized - Invalid user" });
    }

    // ✅ Removed email verification check
    req.creator = creator;
    next();
  } catch (error) {
    console.error("❌ Creator Auth Error:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
}

module.exports = { authPromoterMiddleware, authCreatorMiddleware };
