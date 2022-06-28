import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { users } from './usersReducer';
import { cart } from './cartReducers';
import { productsList } from './productsListReducer';
import { cartDialog } from './cartOpenReducer';
import { checkout } from './checkoutReducer';
import { personal } from './personalReducer';
import { chat } from './chatReducer';


const rootReducer = combineReducers({
  authentication,
  users,
  cart,
  productsList,
  cartDialog,
  checkout,
  personal,
  chat

});

export default rootReducer;
