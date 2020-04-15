import React, { useState, useCallback, useEffect } from 'react';
import TwilioVideo from 'twilio-video';
import axios from 'axios';
import Room from '../components/room/Room';
import { loadModels, getFullFaceDescription } from '../api/face';
import RoomSetup from "./RoomSetup.js"

const VideoManager = () => {
    const [username, setUserName] = useState("");
    const [roomName, setRoomName] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        loadModels();
    }, []);

    const handleUserNameChange = useCallback(event => {
        setUserName(event.target.value);
    });

    const handleRoomNameChange = useCallback(event => {
        setRoomName(event.target.value);
    })

    const submitIdentityAndRoom = useCallback(async event => {
        event.preventDefault();

        let config = {
            body: {
                identity: username,
                room: roomName
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const data = await axios.post("/api/generate-token", config)

            setToken(data.data.token)
        } catch (error) {
            console.log(`Generating Token FAILED: ${error}`);
        }

    }, [username, roomName])

    let renderView;

    if (token) {
        renderView = (
            <Room roomName={roomName} token={token} />
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