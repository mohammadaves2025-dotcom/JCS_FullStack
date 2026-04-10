import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Do NOT call process.exit(1) in serverless — it crashes the entire Vercel function
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

export default connectDB;