import cors from "cors";
import express from "express";
import userRoute from "./routes/user.route.js";
const app = express();
//app.use for configurations

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" })); //to parse req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/user", userRoute);
app.get("/", (req, res) => {
  res.send("running");
});
export { app };
