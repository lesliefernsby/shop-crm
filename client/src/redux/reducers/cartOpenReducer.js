
import { cartConstants } from "../constants";

const initialState = { isOpen: false };

export function cartDialog(state = initialState, action) {
  switch (action.type) {
    case cartConstants.OPEN_CART:
      return {
        isOpen: true,
      };
    case cartConstants.CLOSE_CART:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
}
