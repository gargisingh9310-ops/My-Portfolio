import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 1. Updated Transporter for Render/Production
// Host/Port ki jagah 'service' use karna better hai
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Ye check karne ke liye ki backend startup par hi connected hai ya nahi
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter connection error ❌:", error);
  } else {
    console.log("Server is ready to send emails ✅");
  }
});

export const sendContactMail = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // VALIDATION
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const mailOptions = {
      from: process.env.GMAIL,
      to: process.env.GMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 10px;">${message}</p>
        </div>
      `,
    };

    // SEND EMAIL
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    // Ye logs Render ke "Live Tail" mein dikhenge
    console.error("CRITICAL MAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error_code: error.code // Ye help karega debug karne mein
    });
  }
};