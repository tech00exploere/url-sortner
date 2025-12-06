const express = require("express");
const router = express.Router();

const urlController = require("../controller/url");

// Home page
router.get("/", urlController.home);

// Create short URL
router.post("/", urlController.createShort);

// Redirect route (handled in index.js)
router.get("/:shortId", urlController.redirect);

module.exports = router;