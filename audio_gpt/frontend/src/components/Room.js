import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



// export default class Room extends Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             votesToSkip: 2,
//             guestCanPause: false,
//             isHost: false,
//         };
//         this.roomCode = this.props.match.params.roomCode;
//     }

    

//     render() {
//         return (
//             <div>
//                 <h3> {this.roomCode} </h3>
//                 <p> Votes: {this.state.votesToSkip} </p>
//                 <p> Guest Can Pause: {this.state.guestCanPause} </p>
//                 <p> Host: {this.state.isHost} </p>
//             </div>
//         );
//     }
// }


const Room = () => {
    const { roomCode } = useParams(); // Using useParams hook to get roomCode from URL params
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    // Example useEffect for fetching room details based on roomCode
    useEffect(() => {
        fetchRoomDetails(roomCode); // Implement fetchRoomDetails according to your API or state management
    }, [roomCode]); // Run this effect whenever roomCode changes

    // Example function to fetch room details
    const fetchRoomDetails = async (code) => {
        try {
            // Replace with your actual fetch logic
            const response = await fetch(`/room/${code}`); // Example endpoint
            console.log(response)
            const data = await response.json();
            setVotesToSkip(data.votesToSkip);
            setGuestCanPause(data.guestCanPause);
            setIsHost(data.isHost);
        } catch (error) {
            console.error('Error fetching room details:', error);
        }
    };

    return (
        <div>
            <h3> Room Code: {roomCode} </h3>
            <p> Votes: {votesToSkip} </p>
            <p> Guest Can Pause: {guestCanPause.toString()} </p>
            <p> Host: {isHost.toString()} </p>
        </div>
    );
};

export default Room;

