import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { users } from './usersReducer';
import { cart } from './cartReducers';
import { productsList } from './productsListReducer'


const rootReducer = combineReducers({
  authentication,
  users,
  cart,
  productsList

});

export default rootReducer;
