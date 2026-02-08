import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import chatAPI from '../services/chatAPI';
import mascot from '../assets/mascot.jpeg';
import './chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'user' };
            setMessages([...messages, newMessage]);
            setInput('');
            setLoading(true);

            try {
                const response = await chatAPI.sendMessage(input);
                const botMessage = { text: response.data.text, sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error communicating with the API:', error);
                const errorMessage = { text: 'Error communicating with the API. Please try again.', sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, errorMessage]);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <img src={mascot} alt="Mascot" className="header-mascot" />
                <span>Customer Support Chat</span>
            </div>
            <div className="chat-window">
                {messages.length === 0 && !loading && (
                    <div className="welcome-section">
                        <img src={mascot} alt="Mascot" className="welcome-mascot" />
                        <p className="welcome-text">Hi! I'm ModelFlow Bot. How can I help you today?</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.sender === 'bot' && <img src={mascot} alt="Bot" className="bot-avatar" />}
                        <div className="message-content">
                            {msg.sender === 'bot' ? (
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message bot">
                        <img src={mascot} alt="Bot" className="bot-avatar" />
                        <div className="message-content">Typing...</div>
                    </div>
                )}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
