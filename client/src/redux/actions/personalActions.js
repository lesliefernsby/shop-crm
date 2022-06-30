
import { personalConstants } from "../constants/personalConstants";
import { personalService } from "../service/personalService";

function getMyOrders() {
  return (dispatch) =>
    personalService
      .getMyOrders()
      .then((orders) =>
        dispatch({ type: personalConstants.GET_MY_ORDERS, payload: orders })
      );
}

export const personalActions = {
  getMyOrders,
};
