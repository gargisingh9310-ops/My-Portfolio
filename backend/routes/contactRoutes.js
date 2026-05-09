import express from "express";
import { sendContactMail } from "../controllers/contactController.js";

const router = express.Router();

// POST request handler for /api/contact
// Note: server.js mein prefix "/api/contact" use ho raha hai, 
// toh ye route actually "/" par hi define hoga.
router.post("/", sendContactMail);

export default router; 