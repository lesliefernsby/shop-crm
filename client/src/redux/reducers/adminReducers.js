/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { adminConstants } from "../constants";

const initialState = {
  inputs: {
    productCategoryTitle: "",
    productTitle: "",
    productImageURL: "",
    productDescription: "",
    weight: "",
    price: "",
  },
};

export function checkout(state = initialState, action) {
  switch (action.type) {
    case adminConstants.????????????:
      return {
        ...state,
      };
    default:
      return state;
  }
}
