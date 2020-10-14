import { GET_CHAT, POST_MESSAGE } from "../actions/actionType";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CHAT:
      return { ...state, chats: action.payload };
    case POST_MESSAGE:
      return { ...state, chats: state.chats.concat(action.payload) };
    default:
      return state;
  }
}
