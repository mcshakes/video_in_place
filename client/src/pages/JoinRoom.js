import React, { useState } from 'react';
// import { TwilioVideoConsumer } from "../TwilioContext";
import TwilioContext from "../TwilioContext";


const JoinRoom = () => {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);

    const handleRoomNameChange = event => {
        // setRoomName(event.target.value);
        //do i need?
    };

    return (
        <div>
            <h1>JOINED A ROOM</h1>
        </div>
    )
}

export default JoinRoom;