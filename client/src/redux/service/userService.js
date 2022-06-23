/* eslint-disable import/prefer-default-export */
import { config } from "../constants";
import { authHeader } from "../helpers/authHeader";

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("token");
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${config.API_URL}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("token", user.token);

      return user;
    });
}

function register(username, password, email, firstName, lastName, roles) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      email,
      firstName,
      lastName,
      roles,
    }),
  };

  return fetch(`${config.API_URL}/users/register`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("token", user.token);

      return user;
    });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${config.API_URL}/users`, requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
  register,
  getAll,
};
