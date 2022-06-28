/* eslint-disable import/prefer-default-export */
import { adminConstants } from "../constants/adminConstants";
import { adminService } from "../service/adminService";
import {productsListConstants} from "../constants/productsListConstants"

function setError(value) {
  return (dispatch) => {
    dispatch({ type: adminConstants.SET_ADMIN_ERROR, payload: value });
  };
}

function setPending(value) {
  return (dispatch) => {
    dispatch({ type: adminConstants.SET_ADMIN_PENDING, payload: value });
  };
}

function submitNewProduct() {
  return (dispatch) =>
    adminService
      .submitNewProduct()
      .then((product) =>
        dispatch({ type: adminConstants.SUBMIT_NEW_PRODUCT, payload: product })
      );
}

function editProduct() {
  return (dispatch) =>
    adminService
      .editProduct()
      .then((product) =>
        dispatch({ type: adminConstants.EDIT_PRODUCT, payload: product })
      );
}

function toggleHideStatus(id) {
  return (dispatch) => {
      dispatch(setPending(true));
      dispatch(setError(false));
      adminService.toggleHideStatus(id)
        .then(({product}) => {
          dispatch({ type: productsListConstants.TOGGLE_HIDE_STATUS, payload: {id, product} });
          dispatch(setPending(false));
        },
          () => {
            dispatch(setError(true));
          }
        );
  };
}
export const adminActions = {
  submitNewProduct,
  editProduct,
  toggleHideStatus,
  setError,
  setPending,
};
