import React from "react";
import "../../../styles/Navbar.scss";
import { useTheme } from "../themeBtn/ThemeContext";

const dummyData = ["Jake", "Nate", "Jay", "Mel", "Joe", "Tia", "Mia"];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  let results = [];
  if (searchTerm.length > 0)
    results = dummyData.filter((person) =>
      person.toLowerCase().includes(searchTerm)
    );
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
      <div className="navProfile">avi</div>
    </nav>
  );
};

export default Navbar;
