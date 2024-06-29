import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestHomePage from './testHomePage';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import Layout from './Layout'; // Import the Layout component

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Layout),
    children: [
      { path: '/', element: React.createElement(TestHomePage) },
      { path: 'join', element: React.createElement(RoomJoinPage) },
      { path: 'create', element: React.createElement(CreateRoomPage) },
      { path: 'room/:roomCode', element: React.createElement(Room) },
    ],
  },
]);

const App = () => {
  return React.createElement(RouterProvider, { router: router });
};

export default App;
