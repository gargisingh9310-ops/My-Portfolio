import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://my-portfolio-9qig.onrender.com"
  ]
}));

app.use(express.json());

app.use("/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));