import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URL exists:", Boolean(process.env.MONGO_URL));

    await mongoose.connect(process.env.MONGO_URL);

    console.log("🚀 MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
    process.exit(1); // 1 means exit with failure
  }
};
