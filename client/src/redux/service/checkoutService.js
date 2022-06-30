
import { config } from "../constants";
import { authHeader } from "../helpers/authHeader";

function create({ cart, inputs }) {
  const {
    address1,
    address2,
    cardName,
    cardNumber,
    city,
    country,
    cvv,
    expDate,
    firstName,
    lastName,
    state,
    zip,
    phone,
    email
  } = inputs;

  const delivery = {
    address1,
    address2,
    city,
    country,
    firstName,
    lastName,
    state,
    zip,
    phone,
    email
  };

  const payment = {
    cardName,
    cardNumber,
    cvv,
    expDate,
  };

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ cart, delivery, payment }),
  };

  return fetch(`${config.API_URL}/orders/`, requestOptions).then((res) =>
    res.json()
  );
}

export const checkoutService = {
  create,
};
