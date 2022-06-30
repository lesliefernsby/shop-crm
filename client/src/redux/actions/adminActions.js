
import { adminConstants } from "../constants/adminConstants";
import { adminService } from "../service/adminService";
import { productsListConstants } from "../constants/productsListConstants"

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


export const submitNewProduct = inputs => async dispatch => {
  try {
    dispatch(setPending(true));
    dispatch(setError(false));
    await adminService.submitNewProduct(inputs);
    dispatch(setPending(false));
    dispatch({ type: adminConstants.CLEAR_NEW_PRODUCT_INPUTS });
  } catch (error) {
    dispatch(setError(true));
  }
}
export const submitEditProduct = (inputs, id) => async dispatch => {
  try {
    dispatch(setPending(true));
    dispatch(setError(false));
    await adminService.submitEditProduct(inputs, id);
    dispatch(setPending(false));
    dispatch({ type: adminConstants.CLEAR_NEW_PRODUCT_INPUTS });
  } catch (error) {
    dispatch(setError(true));
  }
}


function toggleHideStatus(id) {
  return (dispatch) => {
    dispatch(setPending(true));
    dispatch(setError(false));
    adminService.toggleHideStatus(id)
      .then(({ product }) => {
        dispatch({ type: productsListConstants.TOGGLE_HIDE_STATUS, payload: { id, product } });
        dispatch(setPending(false));
      },
        () => {
          dispatch(setError(true));
        }
      );
  };
}
function addNewProductInfo(inputs) {
  return (dispatch) => {
    dispatch({ type: adminConstants.ADD_NEW_PRODUCT_INFO, payload: inputs });
  };
}

export const adminActions = {
  submitNewProduct,
  toggleHideStatus,
  setError,
  setPending,
  addNewProductInfo,
  submitEditProduct
};
