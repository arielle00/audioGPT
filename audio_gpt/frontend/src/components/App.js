import React from "react";
// import HomePage from "./HomePage";
// import { createRoot } from 'react-dom/client';

// const App = () => {
//   return (
//     <div>
//       <HomePage />
//     </div>
//   );
// };

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App tab="home" />);

import TestHomePage from "./testHomePage.js";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {path: '/', element: <TestHomePage/>},
    {path: '/join', element: <RoomJoinPage/>},
    {path: '/create', element: <CreateRoomPage/>},
    {path: '/room/:roomCode', element: <Room/>}
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App