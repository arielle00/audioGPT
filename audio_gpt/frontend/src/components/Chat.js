import React, { useState, useRef, useEffect } from 'react';
import bot from "../../static/frontend/static/images/bot.png";
import user from "../../static/frontend/static/images/user.png";
import Modal from './Modal';
//import "./Chat.css";

const Message = ({ role, content }) => (
  <div className="flex flex-row">
    <img src={role === 'user' ? user : bot} alt="Message" className="w-8 h-8 mr-3 rounded-full border border-2 border-gray-700" />
    <div className={`p-2 rounded-lg max-w-xl break-words ${role === 'user' ? 'bg-darkvanilla text-black mt-0 ml-2 mr-5 mb-5' : 'bg-vanilla mt-0 ml-2 mr-5 mb-5'}`}>
      <p>{content}</p>
    </div>
  </div>
);

const Input = ({ value, onChange, handleSubmit, className, loading }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault(); // Prevents default form submission behavior
      handleSubmit(); // Calls the provided submit handler
    }}
    className={`flex ${className}`}
  >
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="flex-1 p-2 border text-white bg-lightbrown border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
      disabled={loading}
    />
    <button
      type="submit" // Change to type="submit"
      className="ml-2 px-4 py-2 bg-brown text-white rounded-lg hover:bg-raisin"
      disabled={loading}
    >
      Send
    </button>
  </form>
);

const History = ({ question, onClick }) => (
  <div onClick={onClick} className="w-2 h-2 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
    <p>{question}</p>
  </div>
);

const Clear = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 w-1/4 bg-raisin text-white rounded-lg hover:bg-red-700 ${className}`}
  >
    Clear
  </button>
);

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  
  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const onKeyPressHandler = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default action if needed
      handleSubmit();
      console.log("enter");
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return; // Don't submit empty inputs
    console.log('Input submitted:', input);
    const newMessage = { role: "user", id: messages.length + 1, text: input };
    addMessage(newMessage);
    setInput("");
    setLoading(true);
    
    try {
      const response = await fetch('/api/add-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const newMessageBot = { role: "bot", id: messages.length + 2, text: data.response }; // Ensure unique ID
        addMessage(newMessageBot);
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    finally{
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([]);
  }

  return (
    <div>
      <div className="justify-center flex inset-0 space-x-4 p-4 items-center bg-gray h-screen">
        <div className="center flex flex-col bg-vanilla rounded-lg shadow-md p-4 w-3/4 h-[80vh]">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-lg font-semibold">CHAT MESSAGES</h3>
            <button className="ml-2 px-2 py-2 bg-brown text-white rounded-lg hover:bg-raisin"
            onClick={() => setModalOpen(true)}>
              Template
            </button>
          </div>
          <hr className="border-t-2 border-amethyst mb-2 mt-2" />
          <div className="overflow-y-auto flex-1 overflow-y-auto mb-4">
            {messages.map((el, i) => (
              <Message key={i} role={el.role} content={el.text} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            handleSubmit={handleSubmit} // Use onSubmit instead of onClick and onKeyDown
            className="my-6"
            loading={loading}
          />
          <Clear onClick={clearChat} className=" w-15 h-15 my-6" />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold">Modal Title</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </div>
  );
}
