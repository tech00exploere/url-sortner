// view/connect.js
const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);   // modern Mongoose (v6+) works without those options
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message || err);
    throw err;
  }
}

module.exports = {
  connectToMongoDB,
};