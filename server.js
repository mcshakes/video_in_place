require('dotenv').config()
const { connect, createLocalTracks, createLocalVideoTrack } = require("twilio-video");
const express = require("express");
const pino = require('pino');
const expressPino = require('express-pino-logger');
const sgMail = require('@sendgrid/mail');
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

let roomObject;

app.post("/api/generate-token", (req, res) => {
    let userIdentity = req.body.body.identity;
    let room = req.body.body.room;

    const accessToken = new AccessToken(
        process.env.ACCOUNT_SID,
        process.env.TWILIO_API_SID,
        process.env.TWILIO_API_SECRET
    );

    // Set the Identity of this token
    accessToken.identity = userIdentity

    // Grant access to Video
    const grant = new VideoGrant();
    console.log("BEFOIRE GRANT =>", grant)
    grant.room = room;
    console.log("AFTER GRANT =>", grant)

    accessToken.addGrant(grant);

    // Serialize the token as a JWT
    const jwt = accessToken.toJwt();

    res.send({
        identity: userIdentity,
        room: room,
        token: jwt
    });
})

app.post("/api/email-invite", async (req, res) => {
    console.log("")
    console.log("")

    console.log("HIT THAT API")

    // room: {
    //     state: 'connected',
    //     sid: 'RM021a83946e3e1fe7925c53b288347956',
    //     participants: {},
    //     name: 'a',
    //     localParticipant: [Object],
    //     isRecording: false,
    //     dominantSpeaker: null
    //   }

    let emailObj = req.body.body.emails
    let emails = emailObj[emailObj.length - 1].split(",")
    let roomInfo = req.body.body.room


    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    for (let i = 0; i < emails.length; i++) {

        const msg = {
            to: `${emails[i]}`,
            from: 'the_devil@hell.org',
            subject: "We're waiting for you",
            text: `Yo! We are in room ${roomInfo.name}`,
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };

        try {
            await sgMail.send(msg);
        } catch (e) {
            console.log("Sendgrid Email error => ", e)
        }

    }


})

