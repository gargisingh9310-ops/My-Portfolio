import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "https://my-portfolio-ni6u.onrender.com",
      "https://my-portfolio-9qig.onrender.com"
    ],
    methods: ["GET", "POST"],
  })
);

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running...");
});

// CONTACT ROUTE
app.post("/send-email", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // 🔍 DEBUG (Render logs me check karne ke liye)
    console.log("EMAIL ENV:", process.env.EMAIL);
    console.log("PASS ENV:", process.env.EMAIL_PASS);

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

   const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // FORCE IPv4 (IMPORTANT)
  connectionTimeout: 15000,
});

    // Mail Options
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: "New Portfolio Contact Message",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Message</h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone || "Not Provided"}</p>
          <p><b>Email:</b> ${email}</p>

          <p><b>Message:</b></p>
          <div style="padding:10px; background:#f4f4f4;">
            ${message}
          </div>
        </div>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed To Send Email",
    });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});