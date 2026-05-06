import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://my-portfolio-9qig.onrender.com",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Contact API
app.post("/contact", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Validation (IMPORTANT)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Nodemailer Transport (STABLE CONFIG)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail Options
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message
    });
  }
});

// PORT (Render safe)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});