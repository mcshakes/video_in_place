import React, { useState, useCallback } from 'react';
import TwilioVideo from 'twilio-video';
import axios from 'axios';

import RoomSetup from "./RoomSetup.js"

const VideoManager = () => {
    const [username, setUserName] = useState("");
    const [roomName, setRoomName] = useState("");
    const [token, setToken] = useState("");

    const handleUserNameChange = useCallback(event => {
        setUserName(event.target.value);
    });

    const handleRoomNameChange = useCallback(event => {
        setRoomName(event.target.value);
    })

    const submitIdentityAndRoom = useCallback(async event => {
        event.preventDefault();

        let config = {
            body: JSON.stringify({
                identity: username,
                room: roomName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const data = await axios.post("/api/generate-token", config)
            console.log("SOME DATA", data)
            setToken(data.data.token)
        } catch (error) {
            console.log(`Error Generating Token: ${error.response.body}`);
        }

    }, [username, roomName])

    // componentDidMount() {
    //     axios.get("/api/generate-token").then(results => {
    //         const { identity, token } = results.data;
    //         this.setState({ identity, token });
    //     })
    // }

    let renderView;

    if (token) {
        renderView = (
            <div>
                <p>Username: {username}</p>
                <p>Room Name: {roomName}</p>
                <p>Token: {token} </p>
            </div>
        )
    } else {
        renderView = (
            <RoomSetup
                username={username}
                roomName={roomName}
                handleUserNameChange={handleUserNameChange}
                handleRoomNameChange={handleRoomNameChange}
                handleSubmit={submitIdentityAndRoom}
            />
        );
    }

    return renderView;


}

export default VideoManager;