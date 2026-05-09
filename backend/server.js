import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes import
import contactRoutes from "./routes/contactRoutes.js";

// Environment variables load karein
dotenv.config();

const app = express();

// --- MIDDLEWARES ---

// CORS Configuration
app.use(
  cors({
    origin: [
      "https://my-portfolio-b05moy5za-gargisingh9310-ops-projects.vercel.app", // Aapka specific Vercel URL
      /\.vercel\.app$/, // Saare Vercel subdomains ke liye
      "http://localhost:5173" // Local development ke liye
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Pre-flight requests handle karne ke liye
app.options("*", cors());

// Body Parser (JSON data accept karne ke liye)
app.use(express.json());

// --- ROUTES ---

// Contact API route
app.use("/api/contact", contactRoutes);

// Root/Test route
app.get("/", (req, res) => {
  res.status(200).send("Backend is running 🚀");
});

// --- SERVER START ---

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is blazing on port ${PORT}`);
});