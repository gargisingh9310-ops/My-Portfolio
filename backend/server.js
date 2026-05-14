import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ROUTES
import contactRoutes from "./routes/contactRoutes.js";

// LOAD ENV
dotenv.config();

const app = express();

// CORS CONFIG
app.use(
  cors({
    origin: [
      "https://my-portfolio-s4f7.onrender.com",
      "http://localhost:5173",
    ],

    methods: ["GET", "POST"],

    credentials: true,
  })
);

// BODY PARSER
app.use(express.json());

// ROUTES
app.use("/api/contact", contactRoutes);

// TEST ROUTE
app.get("/", (req, res) => {

  res.status(200).send("Backend is running 🚀");

});

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server is blazing on port ${PORT}`);

});