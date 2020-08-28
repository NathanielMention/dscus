import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "./actionType";

export function registerUser(userData) {
  const request = fetch("http://localhost:3000/register").then(
    (res) => res.data
  );
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(userData) {
  const request = fetch("http://localhost:3000/login").then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function authUser() {
  const request = fetch("http://localhost:3000/auth").then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = fetch("http://localhost:3000/logout").then((res) => res.data);
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
