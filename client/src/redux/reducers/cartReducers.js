/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { cartConstants } from "../constants";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

export function cart(state = initialState, action) {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      if (state.some((entry) => entry.item.id === action.item.id)) {
        return [
          ...state.filter((entry) => entry.item.id !== action.item.id),
          {
            item: action.item,
            quantity:
              state.find((entry) => entry.item.id === action.item.id).quantity +
              1,
          },
        ];
      }
      return [...state, { item: action.item, quantity: 1 }];

    case cartConstants.REMOVE_FROM_CART: {
      const itemToRemove = state.find(
        (entry) => entry.item.id === action.item.id
      );

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          return [
            ...state.filter((entry) => entry.item.id !== itemToRemove.item.id),
            { item: itemToRemove.item, quantity: itemToRemove.quantity - 1 },
          ];
        }
        return [
          ...state.filter((entry) => entry.item.id !== itemToRemove.item.id),
        ];
      }
      return state;
    }
    case cartConstants.RESET_CART:
      return [];
    default:
      return state;
  }
}
