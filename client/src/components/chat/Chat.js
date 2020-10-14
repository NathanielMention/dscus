import React from "react";
import moment from "moment";
import { Comment, Tooltip, Avatar } from "antd";

function Chat(props) {
  return (
    <div style={{ width: "100%" }}>
      <Comment
        author={props}
        avatar={<Avatar src={props} alt={props} />}
        content={props}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
}

export default Chat;
