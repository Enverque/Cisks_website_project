import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to Database");
  } catch (err) {
    console.error("Connection failed to database", err);
    process.exit(1);
  }
};

export default connectDB;