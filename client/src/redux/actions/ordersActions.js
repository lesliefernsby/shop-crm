/* eslint-disable import/prefer-default-export */
import { ordersConstants } from "../constants/ordersConstants";
import { ordersService } from "../service/ordersService";

function getOrders(id) {
  return (dispatch) =>
    ordersService
      .getOrders(id)
      .then((orders) =>
        dispatch({ type: ordersConstants.GET_ORDERS, payload: { id, orders } })
      );
}

export const ordersActions = {
  getOrders,
};
