
import { checkoutConstants } from "../constants";
import { checkoutService } from "../service/checkoutService";

function addContactInfo(payload) {
  return (dispatch) => {
    dispatch({ type: checkoutConstants.ADD_CONTACT_INFO, payload });
  };
}

function create(payload) {
  return (dispatch) => {
    checkoutService
      .create(payload)
      .then((order) =>
        dispatch({ type: checkoutConstants.CREATE_ORDER, payload: order.id })
      );
  };
}

function nextPage() {
  return (dispatch) => dispatch({ type: checkoutConstants.NEXT_PAGE });
}

function previousPage() {
  return (dispatch) => dispatch({ type: checkoutConstants.PREVIOUS_PAGE });
}

function resetPage() {
  return (dispatch) => dispatch({ type: checkoutConstants.RESET_PAGE });
}

export const checkoutActions = {
  addContactInfo,
  create,
  previousPage,
  nextPage,
  resetPage,
};
