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
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="user-name"
                    value={userName}
                    onChange={handleUserNameChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="name">Room Name:</label>
                <input
                    type="text"
                    id="user-name"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    required
                />
            </div>

            <button type="submit" className="button submit">Enter Room</button>
        </form>
    )
}

export default RoomSetup;