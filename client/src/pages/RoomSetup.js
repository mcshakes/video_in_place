import React from "react";

const RoomSetup = ({
    userName,
    handleUserNameChange,
    roomName,
    handleRoomNameChange,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Join Room</h2>
            <div className="field">
                <div className="control">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="user-name"
                        value={userName}
                        onChange={handleUserNameChange}
                        required
                    />
                </div>
            </div>


            <div className="field">
                <div className="control">
                    <label htmlFor="name">Room Name:</label>
                    <input
                        type="text"
                        id="user-name"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        required
                    />
                </div>
            </div >


            <button type="submit" className="button is-primary">Enter Room</button>
        </form>
    )
}

export default RoomSetup;