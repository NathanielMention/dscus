import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import ThemeBtn from "../common/ThemeBtn";
import { Link } from "react-router-dom";
import "../../../styles/Login.scss";
import "../../../styles/ThemeBtn.scss";
import LoginImg from "../../../public/icons/login.svg";

//react function component to Login user
const Login = ({ history, submit = false, errors = {} }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <>
      <div className="baseContainer">
        <LoginImg className="loginImg" />
        <div className="content">
          <form className="form" onSubmit={handleSubmit} autoComplete="off">
            <ThemeBtn />
            <h2 className="header">Login</h2>
            {errors.onSubmit && (
              <div className="alerts" role="alert">
                {errors.onSubmit}
              </div>
            )}
            <TextInput
              className="formGroup"
              name="username"
              label="Username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />

            <TextInput
              className="formGroup"
              name="passwprd"
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <button type="submit" disabled={submit} className="btn">
              {submit ? "submit..." : "Login"}
            </button>
            <Link
              className="footer"
              to={"/register"}
            >{`Don't Have An Account?`}</Link>
          </form>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.object,
  submit: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default Login;
