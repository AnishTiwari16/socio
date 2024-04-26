import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

//connect dotenv first
dotenv.config({ path: "./env" });
//then connect the DB
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on PORT : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed !!!", err);
  });
