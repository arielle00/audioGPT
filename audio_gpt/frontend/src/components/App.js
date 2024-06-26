import React from "react";
import HomePage from "./HomePage";
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
