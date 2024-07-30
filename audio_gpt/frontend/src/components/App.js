import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestHomePage from './testHomePage';
import Chat from './Chat';
import Layout from './Layout';
import Login from './Login';
import Signup from './Signup';


const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Layout),
    children: [
      { path: '/', element: React.createElement(TestHomePage) },
      { path: 'chat/', element: React.createElement(Chat) },
      { path:  'login/', element: React.createElement(Login)},
      { path:  'signup/', element: React.createElement(Signup)},
    ],
  },
]);

const App = () => {
  return React.createElement(RouterProvider, { router: router });
};

export default App;
