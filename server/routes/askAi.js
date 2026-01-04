import express from "express";
import { askAi } from "../controllers/askAi_controllers.js";

const router = express.Router();

router.post("/ask-ai", askAi);

export default router;
