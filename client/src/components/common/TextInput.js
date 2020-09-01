import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  username,
  password,
  confirmPass,
  label,
  onChange,
  placeholder,
  value,
  error,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={username}>{label}</label>
      <div className="field">
        <input
          type="text"
          username={username}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <label htmlFor={password}>{label}</label>
      <div className="field">
        <input
          type="text"
          password={password}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <label htmlFor={confirmPass}>{label}</label>
      <div className="field">
        <input
          type="text"
          confirmPass={confirmPass}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
