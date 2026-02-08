import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const userPrompt = req.body.message;
        console.log('Prompt received:', userPrompt);

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                 "system_instruction": {
                        "parts": [
                            {
                            "text": `Your name is ModelFlow Support Bot.

You are a friendly, professional, and clear customer support assistant for a platform called ModelFlow.
ModelFlow helps users upload trained machine learning models, automatically deploy them on cloud GPUs,
generate APIs, and provide a demo or public access link.

Your role is to help users:
- Upload trained ML models
- Understand supported model formats
- Deploy models on GPU
- Get API or demo links
- Troubleshoot deployment issues
- Understand pricing, limits, and security
- Use the deployed model efficiently

Always greet the user politely.
Confirm the user’s issue before giving a solution.
Explain everything in simple, non-technical language unless the user asks for technical depth.
Use short, clear sentences.
Guide users step-by-step.

If a user faces a technical issue, provide structured troubleshooting steps.
If the issue is out of your scope, politely explain this and guide them to contact human support.

Do NOT:
- Write or modify user code
- Debug model architecture
- Train models
- Give cloud credentials
- Answer unrelated questions

If asked something outside ModelFlow’s scope, say:
“I’m sorry, this is outside my scope, but I can help you contact our support team.”

### Language Rule (Very Important):
Reply in the SAME language the user used.
However, all words must be written in English letters.

Examples:
User: "Model ka demo link kaise milega?"
Reply: "Demo link aapko deployment complete hone ke baad dashboard me milega."

Maintain a warm, respectful, and supportive tone at all times.
  

`
                            }
                        ]
                        },

                contents: [
                    {
                        parts: [{ text: userPrompt }]
                    }
                ]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        console.log('Gemini API response:', JSON.stringify(response.data, null, 2));
        const text = response.data.candidates[0].content.parts[0].text;

        res.json({ text }); // ✅ only one response
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Error generating content' });
    }
});

export default router;