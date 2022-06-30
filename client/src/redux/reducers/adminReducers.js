/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { adminConstants } from "../constants/adminConstants";

const initialState = {
  pending: false,
  error: false,
  inputs: {
    productCategoryTitle: "",
    productTitle: "",
    productImageURL: "",
    productDescription: "",
    weight: "",
    price: "",
  },
};

export function admin(state = initialState, action) {
  switch (action.type) {
    case adminConstants.SET_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case adminConstants.SET_ADMIN_PENDING:
      return {
        ...state,
        pending: action.payload,
      };

      
    case adminConstants.CLEAR_NEW_PRODUCT_INPUTS:
      return {
        ...state,
        inputs: {
          productCategoryTitle: "",
          productTitle: "",
          productImageURL: "",
          productDescription: "",
          weight: "",
          price: "",
        }
      };
    case adminConstants.EDIT_PRODUCT:
      return {
        ...state,
      };
    case adminConstants.ADD_NEW_PRODUCT_INFO:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ...action.payload
        }
      };
    default:
      return state;
  }
}
