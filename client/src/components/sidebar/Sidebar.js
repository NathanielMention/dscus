import React from "react";
import "../../../styles/Sidebar.scss";
import ComposeSvg from "../../../public/icons/compose.svg";

const Sidebar = () => {
  return (
    <div className="sidenav">
      <div>
        Create New Message<ComposeSvg className="newMsg"></ComposeSvg>
      </div>
      <ul>Rooms</ul>
      <ul>Direct Messages</ul>
    </div>
  );
};

export default Sidebar;
