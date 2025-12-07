const mongoose = require("mongoose");

async function connectToMongoDB(url){
  try{
    await mongoose.connect(url);   // modern Mongoose no longer needs extra options
    console.log("Connected to MongoDB");
  } catch (err){
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports ={
  connectToMongoDB,
};
