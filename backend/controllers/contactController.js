import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },

  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
});

// VERIFY CONNECTION
transporter.verify((error, success) => {

  if (error) {

    console.log("Transporter connection error ❌");
    console.error(error);

  } else {

    console.log("Server is ready to send emails ✅");

  }

});

// SEND MAIL
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
        <div style="font-family: Arial; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          
          <h2>📩 New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>

          <p><strong>Message:</strong></p>

          <div style="background:#f4f4f4; padding:10px; border-radius:8px;">
            ${message}
          </div>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESSFULLY ✅");

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {

    console.error("CRITICAL MAIL ERROR ❌");

    console.error(error);

    console.error(JSON.stringify(error, null, 2));

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error_code: error.code || "UNKNOWN_ERROR",
    });

  }

};