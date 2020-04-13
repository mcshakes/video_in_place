import React, { useState, useEffect, useRef } from 'react';
import './Participant.scss';

const Participant = ({ participant }) => {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const videoRef = useRef();
    const audioRef = useRef();

    const trackPubsToTracks = trackMap => {
        // new Arrays of LocalVideoTrackPublication

        let newTrackArr = Array.from(trackMap.values())

        let existingLocalTrack = newTrackArr.map(publication => publication.track).filter(track => track !== null);

        return existingLocalTrack
    }

    useEffect(() => {
        const trackSubscribed = track => {
            if (track.kind === 'video') {
                setVideoTracks(videoTracks => [...videoTracks, track]);
            } else {
                setAudioTracks(audioTracks => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = track => {
            if (track.kind === 'video') {
                setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
            } else {
                setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
            }
        };

        setVideoTracks(trackPubsToTracks(participant.videoTracks));
        setAudioTracks(trackPubsToTracks(participant.audioTracks));

        participant.on('trackSubscribed', trackSubscribed);
        participant.on('trackUnsubscribed', trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return () => {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    return (
        <div className="card participant">
            <div className="video-container">
                <video id="video" className="image is-500x500" ref={videoRef} autoPlay={true} />
            </div>
            <audio ref={audioRef} autoPlay={true} muted={true} />
            <div className="card-content">
                <div className="media">

                </div>
                <div className="media-content">
                    <h3 className="title is-4">{participant.identity}</h3>
                </div>
            </div>
        </div>
    );
};

export default Participant;