import axios from "axios";

export const generateGeminiReply = async (message, context) => {
  const prompt = `
You are ModelFlow Assistant.
Help ML students deploy models easily.

User context:
${JSON.stringify(context)}

User message:
${message}

Respond clearly and briefly.
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      params: {
        key: process.env.GEMINI_API_KEY
      }
    }
  );

  const reply =
    response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return reply || "I couldn’t understand that. Please try again.";
};
