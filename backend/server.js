import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [/\.vercel\.app$/, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// preflight
app.options("*", cors());

// body parser
app.use(express.json());

// routes
app.use("/api/contact", contactRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ PORT ALWAYS BEFORE listen
const PORT = process.env.PORT || 5000;

// start server (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});