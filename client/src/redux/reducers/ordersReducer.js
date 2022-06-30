
import { ordersConstants } from "../constants/ordersConstants";

const initialState = {
  loading: true,
  orders: [],
};

export function orders(state = initialState, action) {
  switch (action.type) {
    case ordersConstants.GET_ORDERS:
      return {
        ...state,
        orders: [
          ...state.orders.filter((o) => o.id !== action.id),
          action.payload,
        ],
        loading: false,
      };
    default:
      return state;
  }
}
