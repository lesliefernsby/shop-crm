
import { personalConstants } from "../constants/personalConstants";

const initialState = {
  loading: true,
  orders: [],
};

export function personal(state = initialState, action) {
  switch (action.type) {
    case personalConstants.GET_MY_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
