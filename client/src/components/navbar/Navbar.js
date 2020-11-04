import React from "react";
import "../../../styles/Navbar.scss";
import "../../../styles/Modal.scss";
import Modal from "../modal/Modal";
import { useTheme } from "../themeBtn/ThemeContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  let results = [];
  if (searchTerm.length > 0)
    results = users.filter((person) =>
      person.toLowerCase().includes(searchTerm)
    );
  const themeState = useTheme();
  fetch(`http://localhost:5000?q=${searchTerm}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
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
          {results.length > 0 &&
            results.map((person, index) => (
              <li className="searchItems" key={index}>
                {person}
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
