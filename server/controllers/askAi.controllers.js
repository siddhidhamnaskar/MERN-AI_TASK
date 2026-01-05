import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL,
    "X-Title": "MERN AI App",
  },
});

export const askAi = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const completion = await openRouter.chat.send({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
      

        { role: "user", content: prompt },
      ],
      // stream: false,
    });
    console.log("Raw Completion:", completion.choices[0].message.content);
    let answer = completion.choices[0].message.content;

      // // Remove HTML tags
      // answer = answer.replace(/<[^>]*>?/gm, "");

      // // Remove special tokens
      // answer = answer
      //   .replace(/<s>/g, "")
      //   .replace(/<\/s>/g, "")
      //   .trim();
      console.log("Cleaned Answer:", answer);
      res.json({ answer });


  } catch (err) {
    console.error("OpenRouter Error:", err.message);
    res.status(500).json({ error: err.message || "Ai Failed" });
  }
};
