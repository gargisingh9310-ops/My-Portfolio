import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 1. Transporter ko function ke bahar rakhein. 
// Isse connection reuse hota hai aur mail fast jaati hai.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendContactMail = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // VALIDATION
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields (Name, Email, Message)",
      });
    }

    // MAIL OPTIONS
    const mailOptions = {
      from: process.env.GMAIL, // Aapka Gmail address
      to: process.env.GMAIL,   // Jaha aapko inquiry receive karni hai
      replyTo: email,          // Taaki aap directly user ko reply kar sakein
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; color: #333;">
          <h2 style="color: #4A90E2; border-bottom: 2px solid #4A90E2; padding-bottom: 10px;">New Inquiry</h2>
          
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || "Not Provided"}</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Message:</p>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    };

    // SEND EMAIL
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
    });

  } catch (error) {
    console.error("NODEMAILER ERROR:", error);

    // Specific error handling for Auth
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: "Email configuration error. Check App Password.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Failed to send message.",
    });
  }
};