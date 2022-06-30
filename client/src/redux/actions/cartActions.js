
import { cartConstants } from "../constants";
import { cartService } from "../service/cartService";

function addToCart(item) {
  return (dispatch) => {
    cartService.addToCart(item);
    dispatch({ type: cartConstants.ADD_TO_CART, item });
  };
}

function removeFromCart(item) {
  return (dispatch) => {
    cartService.removeFromCart(item);
    dispatch({ type: cartConstants.REMOVE_FROM_CART, item });
  };
}

function resetCart() {
  return (dispatch) => {
    cartService.resetCart();
    dispatch({ type: cartConstants.RESET_CART });
  };
}

function openCart() {
  return (dispatch) => dispatch({ type: cartConstants.OPEN_CART });
}

function closeCart() {
  return (dispatch) => dispatch({ type: cartConstants.CLOSE_CART });
}

export const cartActions = {
  addToCart,
  removeFromCart,
  resetCart,
  openCart,
  closeCart,
};
