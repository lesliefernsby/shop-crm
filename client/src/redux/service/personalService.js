/* eslint-disable import/prefer-default-export */
import { authHeader } from "../helpers/authHeader";
import { config } from "../constants";

function getMyOrders() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/orders/myorders/`, requestOptions).then((res) =>
    res.json()
  );
}


export const personalService = {
  getMyOrders,
}
