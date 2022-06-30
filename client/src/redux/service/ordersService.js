
import { authHeader } from "../helpers/authHeader";
import { config } from "../constants";

function getOrders(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/orders/user/${id}`, requestOptions).then((res) =>
    res.json()
  );
}


export const ordersService = {
  getOrders,
}
