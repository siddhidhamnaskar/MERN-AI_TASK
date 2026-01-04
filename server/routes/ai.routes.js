import express from "express";
import { askAi } from "../controllers/askAi.controllers.js";
import { saveResponse } from "../controllers/AiMesage.controller.js";

const router = express.Router();

router.post("/ask-ai", askAi);
router.post("/save-message", saveResponse); // Placeholder for save message route

export default router;
