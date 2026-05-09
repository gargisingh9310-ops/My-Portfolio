import nodemailer from "nodemailer";

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

    // MAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

    // MAIL OPTIONS
    const mailOptions = {
      from: process.env.GMAIL,

      to: process.env.GMAIL,

      subject: `New Portfolio Contact from ${name}`,

      html: `
        <div style="font-family: Arial; padding: 20px;">
        
          <h2>New Portfolio Contact Message</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Phone:</strong> ${phone || "Not Provided"}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${message}
          </p>

        </div>
      `,
    };

    // SEND EMAIL
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("MAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};