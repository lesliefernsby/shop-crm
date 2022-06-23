import { cartConstants } from "../constants";

const initialState = [];

export function cart(state = initialState, action) {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      if (state.some((entry) => entry.item.id === action.item.id)) {
        return [
          ...state.filter((entry) => entry.item.id !== action.item.id),
          { item: action.item, quantity: state.find((entry) => entry.item.id === action.item.id).quantity + 1 }
        ]
      }  else {
        return [
          ...state,
          { item: action.item, quantity: 1 }
        ];
      }

    case cartConstants.REMOVE_FROM_CART: {
      let itemToRemove = state.find((entry) => entry.item.id === action.item.id);

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          return [
            ...state.filter((entry) => entry.item.id !== itemToRemove.item.id),
            { item: itemToRemove.item, quantity: itemToRemove.quantity - 1 }
          ]
        } else {
          return [
            ...state.filter((entry) => entry.item.id !== itemToRemove.item.id)
          ]
        }
      } else return state
      
    }
    default:
      return state
  }
}
