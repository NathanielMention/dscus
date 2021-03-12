import React, { useState, useEffect } from "react";
import Logo from "../../../public/icons/send.svg";
import TextInput from "../common/TextInput";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import "../../../styles/Messages.scss";
import socket from "../../../config/socketConfig";
import { Comment, Tooltip, Avatar } from "antd";
import { getChat } from "../../redux/actions/chatActions";

function Messages(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dateToFormat = new Date();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChat());
    socket.on("receive message", (data) => {
      console.log(data);
      const message = data;
      const newMessages = [...messages, { message }];
      setMessages(newMessages);
      dispatch(postMessage(data));
    });
  }, [messages]);

  const handleNewMessage = () => {
    socket.emit("new message", {
      message,
      avatar: user.avatar,
      userId: user.id,
      userName: user.username,
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
              author={messages.userName}
              avatar={<Avatar src={message.avatar} alt={message.userName} />}
              content={
                <div>
                  {messages.map((index) => (
                    <p key={index}>{message}</p>
                  ))}
                </div>
              }
              datetime={
                <Tooltip>
                  <Moment
                    date={dateToFormat}
                    format="YYYY-MM-DD HH:mm"
                    parse="YYYY-MM-DD HH:mm"
                    interval={60000}
                  >
                    {dateToFormat}
                  </Moment>
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
