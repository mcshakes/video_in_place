import React, { useState, useCallback } from 'react';
import TwilioVideo from 'twilio-video';
import axios from 'axios';

import joinMeetingRoom from "./JoinRoom.js"
import createMeetingRoom from "./CreateRoom.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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

        const data = await axios.post("/api/generate-token", config)
    })

    // componentDidMount() {
    //     axios.get("/api/generate-token").then(results => {
    //         const { identity, token } = results.data;
    //         this.setState({ identity, token });
    //     })
    // }


    return (
        <div>
            Video Chat as a functional Component
        </div>
    )


}

export default VideoManager;