import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import ThemeBtn from "../common/ThemeBtn";
import { Link } from "react-router-dom";
import "../../../styles/Register.scss";
import "../../../styles/ThemeBtn.scss";

//react function component to register user
const Register = ({ history, submit = false, errors = {} }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/login");
  }

  return (
    <>
      <div className="baseContainer">
        <div className="content">
          <form className="form" onSubmit={handleSubmit} autoComplete="off">
            <ThemeBtn />
            <h2 className="header">Sign Up</h2>
            {errors.onSubmit && (
              <div className="alerts" role="alert">
                {errors.onSubmit}
              </div>
            )}
            <TextInput
              name="username"
              label="Username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />

            <TextInput
              name="passwprd"
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />

            <button type="submit" disabled={submit} className="btn">
              {submit ? "submit..." : "Sign Up"}
            </button>
            <Link className="footer" to={"/login"}>
              Already Have An Account?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

Register.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  errors: PropTypes.object,
  submit: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default Register;
