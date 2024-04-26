import mongoose from "mongoose";

//creating a function to connect to DB
const connectDB = async () => {
  try {
    const connectionInstace = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstace.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection error ", error);
    process.exit(1);
  }
};
export default connectDB;
