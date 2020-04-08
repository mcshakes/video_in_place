import React from 'react';
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

class VideoManager extends React.Component {
    constructor(props) {
        super();
        this.state = {
            identity: null,
            roomName: "",
            roomError: false,
            previewTracks: null,
            localMediaAvailable: false,
            hasJoinedRoom: false,
            activeRoom: null
        }
    }

    // componentDidMount() {
    //     axios.get("/api/generate-token").then(results => {
    //         const { identity, token } = results.data;
    //         this.setState({ identity, token });
    //     })
    // }

    render() {

        return (
            <Router>
                <section className="video-manager" >
                    <Link to="/join" className="button is-primary">Join a Room</Link>
                    <Link to="/create" className="button is-link">Create a Room</Link>
                </section >

                <Route path="/create" component={createMeetingRoom} />
                <Route path="/join" component={joinMeetingRoom} />
            </Router>
        )

    }

}

export default VideoManager;