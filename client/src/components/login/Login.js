import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { Link } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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

        <button type="submit" disabled={submit} className="btn">
          {submit ? "submit..." : "Login"}
        </button>
      </form>
      <Link to={"/register"}>{`Don't Have An Account?`}</Link>
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
