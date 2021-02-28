import React, { useState, useEffect } from "react";
import Messages from "../message/Message";
import socket from "../../../config/socketConfig";

function Chat() {
  const [inRoom, setInRoom] = useState(false);

  useEffect(() => {
    if (inRoom) {
      console.log("joining room");
      socket.emit("room", { room: "test-room" });
    }

    return () => {
      if (inRoom) {
        console.log("leaving room");
        socket.emit("leave room", {
          room: "test-room",
        });
      }
    };
  });

  const handleInRoom = () => {
    inRoom ? setInRoom(false) : setInRoom(true);
  };

  return (
    <div className="chatWrapper">
      <h1>
        {inRoom && `You Have Entered The Room`}
        {!inRoom && `Outside Room`}
      </h1>

      <button onClick={() => handleInRoom()}>
        {inRoom && `Leave Room`}
        {!inRoom && `Enter Room`}
      </button>

      <Messages inRoom={inRoom} />
    </div>
  );
}

export default Chat;
