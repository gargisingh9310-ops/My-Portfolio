// routes/contactRoutes.js

import express from "express";

import { sendContactMail } from "../controllers/contactController.js";

const router = express.Router();

// POST ROUTE
router.post("/", sendContactMail);

export default router;