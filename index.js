const express = require("express");
const path = require("path");
const app = express();

// DB
const { connectToMongoDB } = require("./connect");
const urlRouter = require("./route/url");
const URL = require("./model/url");

const PORT = process.env.PORT || 8004;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Connect to DB
connectToMongoDB("mongodb://localhost:27017/shorturl")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB error:", err.message));

// Home page — show all URLs + form
app.get("/", async (req, res) => {
  try {
    const allURL = await URL.find({});
    res.render("home", { allURL });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Router for creation
app.use("/url", urlRouter);

// Redirect
app.get("/:shortId", async (req, res) => {
  try {
    const entry = await URL.findOne({ shortId: req.params.shortId });

    if (!entry) return res.status(404).send("Short URL not found");

    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();

    return res.redirect(entry.redirectURL);
  } catch (err) {
    res.status(500).send("Redirect Error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;