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

// MIDDLEWARE
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Running...");
});

// CONTACT ROUTE
app.post("/send-email", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // VALIDATION
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // EMAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // MAIL OPTIONS
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: "New Portfolio Contact Message",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Form Message</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div style="background:#f4f4f4; padding:15px; border-radius:8px;">
            ${message}
          </div>
        </div>
      `,
    };

    // SEND EMAIL
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });

  } catch (error) {
    console.log("EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed To Send Email",
    });
  }
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});