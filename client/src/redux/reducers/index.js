import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { users } from './usersReducer';
import { cart } from './cartReducers';
import { productsList } from './productsListReducer';
import { cartDialog } from './cartOpenReducer';
import { checkout } from './checkoutReducer';
import { personal } from './personalReducer';
import { admin } from './adminReducers';


const rootReducer = combineReducers({
  authentication,
  users,
  cart,
  productsList,
  cartDialog,
  checkout,
  personal,
  admin

});

export default rootReducer;
