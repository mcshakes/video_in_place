import React, { useState, useEffect, useCallback } from 'react';
// import './Room.scss';
import axios from 'axios';

const EmailInvite = ({ roomName }) => {
    const [emails, setEmails] = useState([]);

    const handleInputChange = e => {
        const { name, value } = e.target;


        setEmails(
            [...emails, value]
        )
    }

    const sendEmailInvites = useCallback(async event => {
        event.preventDefault();

        let config = {
            body: {
                emails: emails,
                room: roomName
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const data = await axios.post("/api/email-invite", config)

        } catch (error) {
            console.log(`Sending Emails Failed => ${error}`);
        }
    })

    return (
        < div className="invitations" >
            <h2>Send Invites to</h2>

            <div className="invites">
                <div className="field">
                    <div className="control">
                        <label htmlFor="email">Add Email Invites Separated by commas:</label>
                        <textarea
                            type="email"
                            label="Email Invites"
                            id="email-invites"
                            name="email"
                            value={emails.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button className="send-invite button is-primary" onClick={sendEmailInvites}>Send Invite</button>
            </div>
        </div >
    );
};

export default EmailInvite;