import React, { useState } from "react";
import PropTypes from "prop-types";

const ThemeBtn = () => {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  React.useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getColorTheme();
    // if mode saved dark / light
    if (isReturningUser) {
      return savedMode;
      // if preferred theme is dark
    } else if (userPrefersDark) {
      return true;
      // otherwise light
    } else {
      return false;
    }
  }

  function getColorTheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefColorTheme: dark)").matches;
  }
  return (
    <div className="themeContainer">
      <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
      <span className="toggle">
        <input
          checked={darkMode}
          onChange={() => setDarkMode((prevMode) => !prevMode)}
          id="checkbox"
          className="checkbox"
          type="checkbox"
        />
        <label htmlFor="checkbox" />
      </span>
      <span style={{ color: darkMode ? "slateblue" : "grey" }}>☾</span>
    </div>
  );
};

ThemeBtn.propTypes = {
  checked: PropTypes.string,
  darkMode: PropTypes.string,
  onChange: PropTypes.func,
  setDarkMode: PropTypes.string,
  savedMode: PropTypes.string,
  userPrefersDark: PropTypes.string,
};

export default ThemeBtn;
