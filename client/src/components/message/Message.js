import React, { useState, useEffect } from "react";
import Logo from "../../../public/icons/send.svg";
import TextInput from "../common/TextInput";
import moment from "moment";
import { useSelector } from "react-redux";
import "../../../styles/Messages.scss";
import socket from "../../../config/socketConfig";

function Messages(props) {
  const [messageCount, setMessageCount] = useState(0);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    socket.on("receive message", (data) => {
      console.log(data);
      console.log("recieve new message");
      const message = data.message;
      const avatar = data.avatar;
      const nowTime = data.nowTime;
      const userName = data.userName;
      setMessage(message);
      setMessageCount(messageCount + 1);
    });
  }); //only re-run the effect if new message comes in

  const handleNewMessage = () => {
    const nowTime = moment();
    socket.emit("new message", {
      message,
      avatar: user.avatar,
      userId: user.id,
      userName: user.username,
      nowTime,
      room: "test-room",
    });
    setMessage("");
    setMessageCount(messageCount + 1);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {props.inRoom && (
        <>
          <TextInput
            placeholder="Chat"
            value={message}
            onChange={handleChange}
          ></TextInput>
          <Logo className="submitBtn" onClick={() => handleNewMessage()}></Logo>
        </>
      )}
    </div>
  );
}

export default Messages;
