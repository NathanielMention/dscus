import { GET_CHAT, POST_MESSAGE } from "./actionType";

export function getChat() {
  const request = fetch();

  return {
    //get chat to client
    type: GET_CHAT,
    payload: request,
  };
}

export function postMessage(data) {
  return {
    //get recent msg display in real time
    type: POST_MESSAGE,
    payload: data,
  };
}
