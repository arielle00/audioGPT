import React from 'react';
import bot from "/Users/arielle/Desktop/audioGPT/audio_gpt/frontend/static/images/bot.png";
import user from "/Users/arielle/Desktop/audioGPT/audio_gpt/frontend/static/images/user.png";

import "./Message.css";

export default function Message({ role, content }) {
  return (
    <div className="wrapper">
      <div>
        <img
          src={role === "assistant" ? bot : user}
          className="avatar"
          alt="profile avatar"
        />
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}
