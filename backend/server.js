import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// ✅ CORS (abhi sab allow, baad me restrict kar sakti ho)
app.use(cors());
app.use(express.json());

// ✅ Route
app.post("/contact", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // ⚠️ change (important)
      to: process.env.EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

// ✅ IMPORTANT: Render ke liye dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});