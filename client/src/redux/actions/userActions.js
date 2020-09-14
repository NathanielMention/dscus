import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "./actionType";

export async function registerUser(data) {
  const request = await fetch(
    "http://localhost:3000/register",
    {
      body: JSON.stringify(data),
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    data
  );
  return {
    type: REGISTER_USER,
    payload: request.data,
  };
}

export async function loginUser(data) {
  const request = await fetch(
    "http://localhost:3000/login",
    {
      body: JSON.stringify(data),
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    data
  );
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
  const request = await fetch("http://localhost:3000/logout", {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
