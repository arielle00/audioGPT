import React from 'react';
import { useState } from "react";
import bot from "../../static/frontend/static/images/bot.png";
import user from "../../static/frontend/static/images/user.png";

// import Message from "./chat_components/Message";
// import Input from "./chat_components/Input";
// import History from "./chat_components/History";
// import Clear from "./chat_components/Clear";
import "./Chat.css";

const Message = ({ role, content }) => (
  <div className="flex flex-row">
    <img src={role === 'user' ? user : bot} alt="Message" className="w-8 h-8 mr-3 rounded-full border border-2 border-gray-700" />
    <div className={`p-2 rounded-lg max-w-xl break-words ${role === 'user' ? 'bg-blue-500 text-white mt-0 ml-2 mr-5 mb-5' : 'bg-gray-200 m-5'}`}>
      <p>{content}</p>
    </div>
  </div>
);

const Input = ({ value, onChange, onClick, className }) => (
  <div className={`flex ${className}`}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={onClick}
      className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Send
    </button>
  </div>
);

const History = ({ question, onClick }) => (
  <div onClick={onClick} className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
    <p>{question}</p>
  </div>
);

const Clear = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${className}`}
  >
    Clear Chat
  </button>
);

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  
  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  const handleSubmit = async () => {
    // Your form submission logic here
    console.log('Input submitted:', input);
    const newMessage = { role:"user", id: messages.length + 1, text: input };
    addMessage(newMessage)
    
    try {
      const response = await fetch('/api/add-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setInput([]);
  }

  const clear_chat = () => {
      setMessages([]);
  }

  return (
   
    <div>
      <div className=" justify-center flex inset-0 space-x-4 p-4 items-center bg-gray-200 h-10/10">
        <div className=" center flex flex-col bg-white rounded-lg shadow-md p-4 w-3/4 h-[80vh]">
          <h3 className="text-lg font-semibold mb-4">Chat Messages</h3>
          <div className="overflow-y-auto flex-1 overflow-y-auto mb-4">
            {messages.map((el, i) => {
              return <Message key={i} role={el.role} content={el.text} />;
            })}
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={input ? handleSubmit : undefined}
            className="mt-4"
          />
           <Clear onClick={clear_chat} className="mt-4" />
        </div>
        {/* <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">History</h3>
          <div className="flex-1 overflow-y-auto mb-4">
            {history.map((el, i) => {
              return (
                <History
                  key={i}
                  question={el.question}
                  onClick={() =>
                    setMessages([
                      { role: 'user', content: history[i].question },
                      { role: 'assistant', content: history[i].answer },
                    ])
                  }
                />
              );
            })}
          </div>
          <Clear onClick={clear_chat} className="mt-4" />
        </div> */}
      </div>
    </div>
  

    // <div>Whatever dude</div>
    // <div className="Chat">
    //   <div className="Column">
    //     <h3 className="Title">Chat Messages</h3>
    //     <div className="Content">
    //       {messages.map((el, i) => {
    //         return <Message key={i} role={el.role} content={el.text} />;
    //       })}
    //     </div>
    //     <Input
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       onClick={input ? handleSubmit : undefined}

    //     />

    //   </div>
    //   <div className="Column">
    //     <h3 className="Title">History</h3>
    //     <div className="Content">
    //       {history.map((el, i) => {
    //         return (
    //           <History
    //             key={i}
    //             question={el.question}
    //             onClick={() =>
    //               setMessages([
    //                 { role: "user", content: history[i].question },
    //                 { role: "assistant", content: history[i].answer },
    //               ])
    //             }
    //           />
    //         );
    //       })}
    //     </div>
    //     <Clear onClick={clear_chat} />
    //   </div>
    // </div>
  );
}
