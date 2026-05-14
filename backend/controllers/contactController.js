import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// TRANSPORTER
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

// VERIFY
transporter.verify((error, success) => {

  if (error) {

    console.log("Transporter connection error ❌");
    console.error(error);

  } else {

    console.log("Server is ready to send emails ✅");

  }

});
// CHECK CONNECTION ON SERVER START
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter connection error ❌");
    console.error(error);
  } else {
    console.log("Server is ready to send emails ✅");
  }
});

// CONTROLLER
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

    // EMAIL TEMPLATE
    const mailOptions = {
      from: process.env.GMAIL,
      to: process.env.GMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          
          <h2 style="color: #333;">📩 New Contact Form Submission</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Phone:</strong> ${phone || "Not Provided"}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="background: #f4f4f4; padding: 12px; border-radius: 8px;">
            ${message}
          </div>

        </div>
      `,
    };

    // SEND EMAIL
    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESSFULLY ✅");
    console.log("Message ID:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {

    // MAIN ERROR
    console.error("CRITICAL MAIL ERROR ❌");
    console.error(error);

    // DETAILED ERROR
    console.error("FULL ERROR DETAILS:");
    console.error(JSON.stringify(error, null, 2));

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error_code: error.code || "UNKNOWN_ERROR",
    });
  }
};