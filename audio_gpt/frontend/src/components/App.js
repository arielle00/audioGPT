import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestHomePage from './testHomePage';
import Chat from './Chat';
import Layout from './Layout';
import Login from './Login';
import Signup from './Signup';
import Settings from './Settings';

const router = createBrowserRouter([
  {
    path: 'home/',
    element: <Layout />,
    children: [
      { path: 'chat/', element: <Chat /> },
      { path: '', element: <TestHomePage /> },
      { path: 'settings/', element: <Settings /> },
    ],
  },
  {
    path: '/',
    element: <Login />
  },
  { 
    path: 'signup/', 
    element: <Signup /> 
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

