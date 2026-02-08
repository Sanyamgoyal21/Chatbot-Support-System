import axios from "axios";

export const generateGeminiReply = async (message, context) => {
  const prompt = `You are a professional Customer Support Assistant. Provide helpful, clear, and concise responses to customer inquiries.

Customer Question: ${message}

Respond in a friendly and helpful manner.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data.candidates?.length) {
      return "Sorry, I couldn't generate a response. Please try again.";
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw error;
  }
};
