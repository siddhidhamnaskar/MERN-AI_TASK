import AiMessage from "../models/AiMessage.js";
export const saveResponse = async (req, res) => {
   try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({ message: "Prompt and response required" });
    }

    const savedMessage = await AiMessage.create({
      prompt,
      response,
    });

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to save message" });
  }
}