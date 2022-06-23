/* eslint-disable default-param-last */
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { userConstants } from "../constants";

const token = localStorage.getItem("token");
export const initialState = token
  ? { loggedIn: true, user: jwt_decode(token) }
  : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.REGISTER_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
