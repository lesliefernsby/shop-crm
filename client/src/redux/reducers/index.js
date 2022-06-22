import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { users } from './usersReducer';
import { productsList } from './productsListReducer'


const rootReducer = combineReducers({
  authentication,
  users,
  productsList

});

export default rootReducer;
