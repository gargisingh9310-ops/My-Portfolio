import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS FIX (safer + production ready)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-portfolio-4bag400p2-gargisingh9310-ops-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// body parser
app.use(express.json());

// routes
app.use("/api/contact", contactRoutes);

// test route (important for debugging)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});