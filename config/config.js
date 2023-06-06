const mongoose = require("mongoose");

// connect database function

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// ;export function
module.exports = connectDb;
