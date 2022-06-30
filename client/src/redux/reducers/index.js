import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { users } from './usersReducer';
import { cart } from './cartReducers';
import { productsList } from './productsListReducer';
import { cartDialog } from './cartOpenReducer';
import { checkout } from './checkoutReducer';
import { personal } from './personalReducer';
import { admin } from './adminReducers';
import { chat } from './chatReducer';
import { orders } from './ordersReducer';


const rootReducer = combineReducers({
  authentication,
  users,
  cart,
  productsList,
  cartDialog,
  checkout,
  personal,
  admin,
  chat,
  orders

});

export default rootReducer;
