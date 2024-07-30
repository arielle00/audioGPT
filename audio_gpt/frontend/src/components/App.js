import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestHomePage from './testHomePage';
import Chat from './Chat';
import Layout from './Layout'; // Import the Layout component

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Layout),
    children: [
      { path: '/', element: React.createElement(TestHomePage) },
      { path: 'chat/', element: React.createElement(Chat) },
    ],
  },
]);

const App = () => {
  return React.createElement(RouterProvider, { router: router });
};

export default App;
