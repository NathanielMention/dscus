import React from "react";
import "../../../styles/Navbar.scss";
import { useTheme } from "../themeBtn/ThemeContext";

const dummyData = ["Jake", "Nate", "Jay", "Mel", "Joe", "Tia", "Mia"];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results = dummyData.filter((person) =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
  const themeState = useTheme();
  return (
    <nav className="navbar">
      <div className="logo">Dscus</div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="formCenter"
      />
      <ul className="searchList">
        {searchResults.map((item) => (
          <li key={item.id}>{item}</li>
        ))}
      </ul>
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
