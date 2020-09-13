import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "./actionType";

export async function registerUser(dataToSubmit) {
  const request = await fetch("http://localhost:3000/register", dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: request.data,
  };
}

export async function loginUser(dataToSubmit) {
  const request = await fetch("http://localhost:3000/login", dataToSubmit);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export async function authUser() {
  const request = await fetch("http://localhost:3000/auth");
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export async function logoutUser() {
  const request = await fetch("http://localhost:3000/logout");
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
