require('dotenv').config()
const { connect, createLocalTracks, createLocalVideoTrack } = require("twilio-video");
const express = require("express");
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const bodyParser = require('body-parser');

const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressLogger);

const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'build')));

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.listen(port, () => {
    logger.info('Server running on port %d', port);
})

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post("/api/generate-token", (req, res) => {
    const testUser = 'example-user';

    console.log("BODY", req.body)

    // const accessToken = new AccessToken(
    //     process.env.ACCOUNT_SID,
    //     process.env.TWILIO_API_SID,
    //     process.env.TWILIO_API_SECRET
    // );

    // // Set the Identity of this token
    // accessToken.identity = testUser;

    // // Grant access to Video
    // const grant = new VideoGrant();
    // grant.room = 'cool room';
    // accessToken.addGrant(grant);

    // // Serialize the token as a JWT
    // const jwt = accessToken.toJwt();

    // console.log("What's here?", res)

    // res.send({
    //     identity: testUser,
    //     token: jwt
    // });
})

// createLocalVideoTrack({ name: 'camera' }).then(function (localTrack) {
//     console.log(localTrack.name); // 'camera'
// });

// createLocalTracks({
//     audio: true,
//     video: { width: 640 }
// }).then(localTracks => {
//     return connect(accessToken, {
//         name: "DailyStandup",
//         tracks: localTracks
//     });
// }).then(room => {
//     console.log(`Connected to Room: ${room.name}`);
// });

// const roomConfigs = { name: "DailyStandup", tracks: [] }

// connect(accessToken, roomConfigs).then(room => {
//     console.log("`Successfully joined a room ${room}");

//     room.on("participantConnected", participant => {
//         console.log(`A remote Participant connected ${participant}`);
//     });

// }, error => {
//     console.error(`Unable to connect to Room: ${error.message}`)
// })
