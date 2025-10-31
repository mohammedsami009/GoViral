// src/App.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const promotionRequestRoutes = require("./routes/promotionRequest.routes");
const campaignRoutes = require("./routes/campaign.routes");
const promoterRoutes = require("./routes/promoter.routes");



const app = express();

// ===============================
// MIDDLEWARE CONFIGURATION
// ===============================

// CORS Setup — Adjust your frontend URL if needed
app.use(
  cors({
    origin: "http://localhost:3000", // your React frontend URL
    credentials: true, // allow cookies
  })
);

// Parse cookies for authentication
app.use(cookieParser());

// Parse JSON request bodies
app.use(express.json());

// ===============================
// ROUTES
// ===============================

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 GoViral Backend Server is running successfully!");
});

// Authentication routes (login, register, logout, verify)
app.use("/api/auth", authRoutes);

// Protected profile routes (creator & promoter)
app.use("/api/user", userRoutes);

// Promotion request routes (create, update, delete, view)
app.use("/api/requests", promotionRequestRoutes);

app.use("/api/campaigns", campaignRoutes);

app.use("/api/promoters", promoterRoutes);
// ===============================
// ERROR HANDLER (optional)
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ===============================
// EXPORT APP
// ===============================
module.exports = app;
