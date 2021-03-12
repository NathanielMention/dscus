import { GET_CHAT, POST_MESSAGE } from "./actionType";

export async function getChat() {
  try {
    const response = await fetch("http://localhost:5000/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const responseData = await response.json();
    return {
      type: GET_CHAT,
      payload: responseData,
    };
  } catch (error) {
    console.log(error);
  }
}

export function postMessage(data) {
  return {
    //get recent msg display in real time
    type: POST_MESSAGE,
    payload: data,
  };
}
