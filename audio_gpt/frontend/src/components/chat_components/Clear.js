
import React from 'react';
import "./Clear.css";

export default function Clear({ onClick }) {
  return (
    <button className="wrapper" onClick={onClick}>
      Clear
    </button>
  );
}
