const mongoose = require("mongoose");
async function connectToMongoDB(url){
  try{
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  }catch (err){
    console.error("connection error:", err.message || err);
    throw err;
  }
}
module.exports={
  connectToMongoDB,
};
