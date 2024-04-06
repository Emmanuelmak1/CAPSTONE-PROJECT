import React, { useState } from 'react';
import './chatbotUI.css'; // Ensure this path is correct

function ChatbotUI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { message: "Hello, I'm your tour Guide today! How may I help you?!", sender: "ChatGPT" }
    ]);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!userMessage.trim()) return;

        const newUserMessage = { message: userMessage, sender: "user" };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);

        // Reset the user input field after sending
        setUserMessage('');
        setIsTyping(true);

        // Simulate API call to OpenAI
        await processMessageToChatGPT(userMessage);
    };

    async function processMessageToChatGPT(typedMessage) {
        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Youre a tour guide to assist people."
                },
                {
                    role: "user",
                    content: typedMessage
                }
            ]
        };

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch from OpenAI');
            }

            const data = await response.json();
            const botReply = { message: data.choices[0].message.content.trim(), sender: "ChatGPT" };
            setMessages(prevMessages => [...prevMessages, botReply]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prevMessages => [...prevMessages, {
                message: "Sorry, I couldn't process that.",
                sender: "ChatGPT"
            }]);
        } finally {
            setIsTyping(false);
        }
    }

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
            <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Chat' : 'Chat with us!'}
            </div>
            {isOpen && (
                <>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.message}
                            </div>
                        ))}
                        {isTyping && <div className="message ChatGPT">ChatGPT is typing...</div>}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message here..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ChatbotUI;
