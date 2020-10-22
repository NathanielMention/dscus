import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "./actionType";

export async function registerUser(data) {
  try {
    const response = await fetch("http://localhost:5000/register", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    return {
      type: REGISTER_USER,
      payload: responseData,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(data) {
  try {
    const response = await fetch("http://localhost:5000/login", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    if (response.status === 400 || response.status === 401) {
      return {
        type: LOGIN_USER,
        payload: { responseData },
      };
    } else {
      return {
        type: LOGIN_USER,
        payload: responseData,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  const request = await fetch("http://localhost:5000/logout", {
    method: "DELETE",
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
