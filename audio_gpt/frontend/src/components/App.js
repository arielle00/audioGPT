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
    element: <Layout />,
    children: [
      { path: '/', element: <TestHomePage /> },
      { path: 'chat/', element: <Chat /> },
      { path: 'login/', element: <Login /> },
      { path: 'signup/', element: <Signup /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

