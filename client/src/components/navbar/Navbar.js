import React from "react";
import "../../../styles/Navbar.scss";
import "../../../styles/Modal.scss";
import Modal from "../modal/Modal";
import { useTheme } from "../themeBtn/ThemeContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const handleChange = async (e) => {
    setSearchTerm(e.target.value);
    const response = await fetch(
      `http://localhost:5000/search?q=${e.target.value}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const parseResponse = await response.json();
    setUsers(parseResponse);
  };
  const themeState = useTheme();
  return (
    <nav className="navbar">
      <div className="logo">Dscus</div>
      <div className="liWrapper">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          className="formCenter"
        />
        <ul className="searchList">
          {users.map((user, index) => (
            <li className="searchItems" key={index}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="toggle-container">
        <span style={{ color: "slateblue" }}>☾</span>
        <span className="toggle">
          <input
            onChange={() => themeState.toggle()}
            id="checkbox"
            className="checkbox"
            type="checkbox"
          />
          <label htmlFor="checkbox" />
        </span>
        <span style={{ color: "yellow" }}>☀︎</span>
      </div>
      <Modal></Modal>
    </nav>
  );
};

export default Navbar;
