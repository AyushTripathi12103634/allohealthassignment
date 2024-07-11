import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoURI);
    console.log(`Connected successfully to mongodb `);
  } catch (error) {
    console.log(`Error Connecting to MongoDb ${error}`);
  }
};

export default connectDB;