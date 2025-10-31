const jwt = require("jsonwebtoken");
const Creator = require("../models/Creator.model");

/**
 * Middleware to authenticate logged-in Creator users.
 * - Verifies JWT token from cookies
 * - Finds the creator in DB
 * - Attaches creator info to req.creator
 * - Blocks access if not authenticated or not verified
 */
async function authCreatorMiddleware(req, res, next) {
  try {
    // 1️⃣ Check if token exists in cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // 3️⃣ Find creator in DB
    const creator = await Creator.findById(decoded.id).select("-password");
    if (!creator) {
      return res.status(401).json({ message: "Unauthorized - Creator not found" });
    }

    // 4️⃣ Optional: check if verified (if you plan to use email verification)
    if (creator.verified === false) {
      return res.status(403).json({
        message: "Please verify your email before accessing this resource.",
      });
    }

    // 5️⃣ Attach creator info to request
    req.creator = creator;
    next();
  } catch (error) {
    console.error("❌ Creator Auth Middleware Error:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
}

module.exports = authCreatorMiddleware;
