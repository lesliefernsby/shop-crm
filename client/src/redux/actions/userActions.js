
import jwt_decode from 'jwt-decode';
import { userConstants } from "../constants";
import { userService } from "../service/userService";

function login(username, password) {
  
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user: jwt_decode(user.token) };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
  return (dispatch) => {
        userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function register(username, password, email, firstName = "", lastName = "") {
  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user: jwt_decode(user.token) };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
  email = email || username;
  const roles = ["User"];
  return (dispatch) => {
    dispatch(request({ username }));

    userService
      .register(username, password, email, firstName, lastName, roles)
      .then(
        (user) => {
          dispatch(success(user));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getAll() {
  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
  
  return (dispatch) => {
    dispatch(request());
    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error))
    );
  };
}

export const userActions = {
  login,
  logout,
  getAll,
  register,
};
