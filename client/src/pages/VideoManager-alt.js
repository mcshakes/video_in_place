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
            roomName: "Test",
            roomError: false,
            previewTracks: null,
            localMediaAvailable: false,
            hasJoinedRoom: false,
            activeRoom: null,
            roomSelection: false,
        }
    }

    // componentDidMount() {
    //     axios.get("/api/generate-token").then(results => {
    //         const { identity, token } = results.data;
    //         this.setState({ identity, token });
    //     })
    // }

    selectRoom = (e) => {
        this.setState(prevState => {
            return { roomSelection: !prevState.roomSelection };
        })
        console.log(this.state.roomSelection)
    }

    render() {
        let renderLinks;

        if (!this.state.roomSelection) {
            renderLinks = (
                <>
                    <Link to="/join" className="button is-primary" onClick={this.selectRoom}>Join a Room</Link>
                    <Link to="/create" className="button is-link" onClick={this.selectRoom}>Create a Room</Link>
                </>
            )
        } else {
            renderLinks = <Link to="/" className="button is-link" onClick={this.selectRoom}>Leave Room</Link>
        }

        return (
            < Router >
                <section className="video-manager" >
                    {renderLinks}
                    <div className="current-room">
                        <Switch>
                            <Route path="/create" component={createMeetingRoom} />
                            <Route path="/join" component={joinMeetingRoom} />
                        </Switch>
                    </div>
                </section >

            </Router >
        )

    }

}

export default VideoManager;