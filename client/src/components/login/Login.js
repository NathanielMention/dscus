import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { Link } from "react-router-dom";

const Register = ({ onSubmit, onChange, submit = false, errors = {} }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        {errors.onSubmit && (
          <div className="alerts" role="alert">
            {errors.onSubmit}
          </div>
        )}
        <TextInput
          name="username"
          label="Username"
          value={""}
          onChange={onChange}
          error={errors.username}
        />

        <TextInput
          name="passwprd"
          label="Password"
          value={""}
          onChange={onChange}
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

Register.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  submit: PropTypes.bool,
};

export default Register;
