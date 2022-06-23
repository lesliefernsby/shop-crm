/* eslint-disable import/prefer-default-export */
import { cartConstants } from "../constants";
import { cartService } from "../service/cartService";

function addToCart(item) {
  return dispatch => { 
    cartService.addToCart(item);
    dispatch({ type: cartConstants.ADD_TO_CART, item});
  };
}

function removeFromCart(item) {
  return dispatch => { 
    cartService.removeFromCart(item);
    dispatch({ type: cartConstants.REMOVE_FROM_CART, item});
  };
}

export const cartActions = {
  addToCart,
  removeFromCart
};
