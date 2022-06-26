/* eslint-disable import/prefer-default-export */
import { checkoutConstants } from "../constants";
import { personalService } from "../service/personalService";

function getMyOrders() {
  personalService.getMyOrders().then((orders) => (dispatch) => {
    dispatch({ type: checkoutConstants.ADD_CONTACT_INFO, payload: orders });
  });
}

export const personalActions = {
  getMyOrders,
};
