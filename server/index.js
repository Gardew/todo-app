import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Připojeno k MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server běží na portu ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB chyba:", err);
  });
