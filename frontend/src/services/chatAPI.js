import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/chat';

const sendMessage = async (message, context = {}) => {
    try {
        const response = await axios.post(API_URL, { 
            message,
            context 
        });
        return response;
    } catch (error) {
        console.error('Error sending message to Gemini API:', error);
        throw error;
    }
};

export default { sendMessage };
