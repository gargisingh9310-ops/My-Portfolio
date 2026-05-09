import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// ✅ IMPORTANT: allow all Vercel + local
app.use(cors({
  origin: [/\.vercel\.app$/, "http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

// IMPORTANT for preflight (CORS fix)
app.options("*", cors());

app.use(express.json());

app.use("/api/contact", contactRoutes);
app.listen(PORT);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});