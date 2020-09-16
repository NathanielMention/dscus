import React from "react";
import ThemeBtn from "../common/ThemeBtn";

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
  return (
    <nav className="navbar">
      <div className="logo">Dscus</div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map((item) => (
          <li key={item.id}>{item}</li>
        ))}
      </ul>
      <ThemeBtn></ThemeBtn>
      <div className="navProfile">avi</div>
    </nav>
  );
};

export default Navbar;
