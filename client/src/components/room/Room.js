import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from '../participant/Participant';
import './Room.scss';

const Room = ({ roomName, token }) => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    const buildRoom = (participantConnected) => {
        Video.connect(token, {
            name: roomName
        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.participants.forEach(participantConnected);
        });

        return () => {
            setRoom(currentRoom => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            });
        };
    }


    useEffect(() => {
        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };

        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p !== participant)
            );
        };

        buildRoom(participantConnected)

    }, [roomName, token]);

    return (
        < div className="room is-flex" >
            <div className="room-info">
                <h2>Room Name: {roomName}</h2>
                <button className="button">Leave Room</button>
            </div>

            <div className="participants">
                <div className="local-participant">
                    {room ? (
                        <Participant
                            key={room.localParticipant.sid}
                            participant={room.localParticipant}
                        />
                    ) : (
                            ''
                        )}
                </div>
                <h3>Remote Participants</h3>
                <div className="remote-participants">{remoteParticipants}</div>
            </div>
        </div >
    );
};

export default Room;