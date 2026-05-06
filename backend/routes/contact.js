import express from "express";
import { transporter } from "../config/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Message from ${name}`,
      html: `<p>${message}</p>`
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;