// controllers/contactController.js

import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// TWILIO CLIENT
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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

    console.log("Incoming Form Data ✅");
    console.log({
      name,
      phone,
      email,
      message,
    });

    // SEND SMS
    const sms = await client.messages.create({

      body: `
📩 New Portfolio Message

👤 Name: ${name}

📞 Phone: ${phone || "Not Provided"}

📧 Email: ${email}

💬 Message:
${message}
      `,

      // TWILIO NUMBER
      from: process.env.TWILIO_PHONE_NUMBER,

      // YOUR REAL NUMBER
      to: "+919310227096",

    });

    console.log("SMS SENT SUCCESSFULLY ✅");

    console.log("MESSAGE SID:");
    console.log(sms.sid);

    return res.status(200).json({
      success: true,
      message: "SMS sent successfully!",
    });

  } catch (error) {

    console.error("TWILIO ERROR ❌");

    console.error("FULL ERROR:");
    console.error(error);

    console.error("ERROR MESSAGE:");
    console.error(error.message);

    console.error("ERROR CODE:");
    console.error(error.code);

    console.error("MORE INFO:");
    console.error(error.moreInfo);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send SMS",
    });

  }

};