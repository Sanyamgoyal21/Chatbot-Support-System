import { generateGeminiReply } from "../services/gemini.service.js";

export const chatWithGemini = async (req, res) => {
  const { message, context } = req.body;

  console.log("Incoming message:", message);
  console.log("Context:", context);

  try {
    const reply = await generateGeminiReply(message, context);
    console.log("Gemini reply:", reply);

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ reply: "AI service failed" });
  }
};
