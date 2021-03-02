import React, { useState, useEffect } from "react";
import Logo from "../../../public/icons/send.svg";
import TextInput from "../common/TextInput";
import moment from "moment";
import { useSelector } from "react-redux";
import "../../../styles/Messages.scss";
import socket from "../../../config/socketConfig";
import { Comment, Tooltip, Avatar } from "antd";

function Messages(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    socket.on("receive message", (data) => {
      console.log(data);
      const message = data.message;
      const avatar = data.avatar;
      const nowTime = data.nowTime;
      const userName = data.userName;
      const newMessages = [...messages];
      newMessages.push(message);
      console.log(newMessages);
      setMessages(newMessages);
    });
  }, []);

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
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {props.inRoom && (
        <>
          <div style={{ width: "100%" }}>
            <Comment
              author={""}
              avatar={<Avatar src={"avatar"} alt={"userName"} />}
              content={
                message.substring(0, 8) === "uploads/" ? (
                  // this will be either video or image

                  message.substring(message.length - 3, message.length) ===
                  "mp4" ? (
                    <video
                      style={{ maxWidth: "200px" }}
                      src={`http://localhost:5000/${message}`}
                      alt="video"
                      type="video/mp4"
                      controls
                    />
                  ) : (
                    <img
                      style={{ maxWidth: "200px" }}
                      src={`http://localhost:5000/${message}`}
                      alt="img"
                    />
                  )
                ) : (
                  <div>
                    {messages.map((message) => (
                      <p key={message}>{message}</p>
                    ))}
                  </div>
                )
              }
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            />
          </div>
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
