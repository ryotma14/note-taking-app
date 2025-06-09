import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🚀 ~ MANGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    process.exit(1); // 1 means exit with failure
  }
};
