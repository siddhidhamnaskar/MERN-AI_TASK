import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import askAiRoute from "./routes/ai.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", askAiRoute);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
