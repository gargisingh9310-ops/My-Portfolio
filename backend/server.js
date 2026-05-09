import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// ================= CORS =================
app.use(
  cors({
    origin: [
      "https://my-portfolio-9qig.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Server Running...");
});

// ================= CONTACT ROUTE =================
app.post("/send-email", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // ================= DEBUG =================
    console.log("EMAIL:", process.env.EMAIL);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "FOUND" : "MISSING"
    );

    // ================= VALIDATION =================
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ================= TRANSPORTER =================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ================= VERIFY SMTP =================
    await transporter.verify();

    console.log("SMTP SERVER READY");

    // ================= MAIL OPTIONS =================
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: email,
      subject: "New Portfolio Contact Message",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          
          <h2 style="color:#333;">
            New Portfolio Contact Message
          </h2>

          <hr />

          <p>
            <b>Name:</b> ${name}
          </p>

          <p>
            <b>Phone:</b> ${phone || "Not Provided"}
          </p>

          <p>
            <b>Email:</b> ${email}
          </p>

          <p>
            <b>Message:</b>
          </p>

          <div 
            style="
              background:#f4f4f4;
              padding:15px;
              border-radius:8px;
            "
          >
            ${message}
          </div>

        </div>
      `,
    };

    // ================= SEND MAIL =================
    await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESSFULLY");

    return res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Email sending failed",
      error: error.message,
    });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});