/* eslint-disable import/prefer-default-export */
import { config } from "../constants";
import { authHeader } from "../helpers/authHeader";

function loadMessages(userId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.API_URL}/messages/${userId}`, requestOptions).then((res) =>
    res.json()
  );
}

export const chatService = {
  loadMessages
};
