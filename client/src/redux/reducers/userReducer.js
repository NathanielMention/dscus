import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "../actions/actionType";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
