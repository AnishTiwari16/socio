import cors from "cors";
import express from "express";

const app = express();
//app.use for configurations

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.get("/", (req, res) => {
  res.send("running");
});
export { app };
