import express from "express";
import { askAi } from "../controllers/askAi.controllers.js";
import { saveResponse, getMessages } from "../controllers/AiMesage.controller.js";

const router = express.Router();

router.get("/messages", getMessages);
router.post("/ask-ai", askAi);
router.post("/save-message", saveResponse); // Placeholder for save message route

export default router;
