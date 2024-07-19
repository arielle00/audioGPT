import React from 'react';
import "./Input.css";

export default function Input({ value, onChange, onClick }) {
  return (
    <div className="wrapper">
      <input
        className="text"
        placeholder="Your prompt here..."
        value={value}
        onChange={onChange}
        
      />
      <button className="btn" onClick={onClick}>
        Go
      </button>
    </div>
  );
}
