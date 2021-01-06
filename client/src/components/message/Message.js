import React, { useState, useEffect } from "react";
import Logo from "../../../public/icons/send.svg";
import TextInput from "../common/TextInput";
import "../../../styles/Messages.scss";

const io = require("socket.io-client");
const socket = io("http://localhost:5001");

function Messages(props) {
  const [messageCount, setMessageCount] = useState(0);
  const [message, setMessage] = useState("");

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

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <p>{messageCount} messages have been emitted</p>

      {props.inRoom && (
        <>
          <TextInput placeholder="Chat" onChange={handleChange}></TextInput>
          <Logo className="submitBtn" onClick={() => handleNewMessage()}></Logo>
        </>
      )}
    </div>
  );
}

export default Messages;
