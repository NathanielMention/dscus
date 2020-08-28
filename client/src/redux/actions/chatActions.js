import { GET_CHAT, POST_MESSAGE } from "./actionType";

export function getChat() {
  const request = fetch();

  return {
    type: GET_CHAT,
    payload: request,
  };
}

export function postMessage(data) {
  return {
    type: POST_MESSAGE,
    payload: data,
  };
}
