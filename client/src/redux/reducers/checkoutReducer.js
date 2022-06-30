
import { checkoutConstants } from "../constants";

const initialState = {
  page: 0,
  inputs: {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    saveAddress: true,
    cardName: "",
    cardNumber: "",
    cvv: "",
    expDate: "",
    saveCard: true,
    phone: "",
    email: ""
  },
  orderCreated: false,
  orderNumber: undefined
};

export function checkout(state = initialState, action) {
  switch (action.type) {
    case checkoutConstants.RESET_PAGE:
      return {
        ...state,
        page: 0,
      };

    case checkoutConstants.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };

    case checkoutConstants.PREVIOUS_PAGE:
      return {
        ...state,
        page: state.page > 0 ? state.page - 1 : 0,
      };

    case checkoutConstants.ADD_CONTACT_INFO:
      return {
        ...state,
        inputs: action.payload,
      };

    case checkoutConstants.CREATE_ORDER:
      return {
        ...state,
        orderCreated: true,
        orderNumber: action.payload
      };

    default:
      return state;
  }
}
