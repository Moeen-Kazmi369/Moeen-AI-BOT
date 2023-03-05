import React, { useState } from "react";
import "./index.css";
import axios from 'axios'

const ChatGPTDisplay = () => {
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [firstAI, setFirstAI] = useState("Hello, how can I help you..."); // initialized with a greeting message
  const [isFirstAI, setIsFirstAI] = useState(true); // track if it's the first AI message
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog([...chatLog, { question, isUser: true }]);
    setQuestion("");
    AIreply();
  };

  const AIreply = () => {
    setIsFirstAI(false); // mark it as not the first AI message
    setLoading(true);
    axios.post('http://localhost:3000/chat', {
      question,
    }).then((response) => {
      setChatLog([...chatLog, { answer: response.data.answer, isUser: false }]); // append the AI response to the chat log
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  return (
    <div className="flex">
      <h1 className="h1">Chat with Moeen AI-BOT</h1>
      <div className="chat-log">
        {chatLog.map((chatMessage, index) => (
          <p key={index} className={chatMessage.isUser ? "Hp" : "AIp"}>
            {chatMessage.isUser ? "Q: " : "A: "}{chatMessage.question || chatMessage.answer}
          </p>
        ))}
        {loading ? (<p className="AIp">Typing.......</p>) : null}
        {/* check if it's the first AI message */}
        {isFirstAI ? (
          <p className="AIp">A: {firstAI}</p>
        ) : null}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type={"text"}
          placeholder="Type your message here"
          required={true}
          value={question}
          onChange={handleMessageChange}
        />
        <button disabled={loading} type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatGPTDisplay;
