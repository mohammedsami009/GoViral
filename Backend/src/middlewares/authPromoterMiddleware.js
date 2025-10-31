// This file previously contained route handlers by mistake.
// Keep a small compatibility shim that re-exports the real promoter middleware
// from `auth.middleware.js` so any existing require() calls continue to work.

const { authPromoterMiddleware } = require("./auth.middleware");

module.exports = authPromoterMiddleware;
