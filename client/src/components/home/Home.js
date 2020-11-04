import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Wrapper from "../common/Wrapper";
import "../../../styles/Chat.scss";

const io = require("socket.io-client");
const socket = io("http://localhost:5001");

function Chat() {
  const [inRoom, setInRoom] = useState(false);

  useEffect(() => {
    if (inRoom) {
      console.log("joining room");
      socket.emit("join room", { room: "test-room" });
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

function Messages(props) {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    socket.on("receive message", () => {
      setMessageCount(messageCount + 1);
    });
  });

  useEffect(() => {
    console.log("received new message");
    document.title = `${messageCount} new messages have been emitted`;
  }, [messageCount]); //only re-run the effect if new message comes in

  const handleNewMessage = () => {
    console.log("emitting new message");
    socket.emit("new message", {
      room: "test-room",
    });

    setMessageCount(messageCount + 1);
  };

  return (
    <div>
      <p>{messageCount} messages have been emitted</p>

      {props.inRoom && (
        <button onClick={() => handleNewMessage()}>Emit new message</button>
      )}
    </div>
  );
}

const Home = () => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Sidebar />
        <Chat />
      </Wrapper>
    </>
  );
};

export default Home;
