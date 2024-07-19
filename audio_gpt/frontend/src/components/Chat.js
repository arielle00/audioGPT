import React from 'react';
import { useState } from "react";

import Message from "./chat_components/Message";
import Input from "./chat_components/Input";
import History from "./chat_components/History";
import Clear from "./chat_components/Clear";

import "./Chat.css";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  
  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  const handleSubmit = () => {
    // Your form submission logic here
    console.log('Input submitted:', input);
    const newMessage = { id: messages.length + 1, text: input };
    addMessage(newMessage)
    // You can also add other actions, like sending the input to an API
  };

  const clear_chat = () => {
      setMessages([]);
  }

  return (
    <div className="Chat">
      <div className="Column">
        <h3 className="Title">Chat Messages</h3>
        <div className="Content">
          {messages.map((el, i) => {
            return <Message key={i} role={el.role} content={el.text} />;
          })}
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={input ? handleSubmit : undefined}

        />
      </div>
      <div className="Column">
        <h3 className="Title">History</h3>
        <div className="Content">
          {history.map((el, i) => {
            return (
              <History
                key={i}
                question={el.question}
                onClick={() =>
                  setMessages([
                    { role: "user", content: history[i].question },
                    { role: "assistant", content: history[i].answer },
                  ])
                }
              />
            );
          })}
        </div>
        <Clear onClick={clear_chat} />
      </div>
    </div>
  );
}
