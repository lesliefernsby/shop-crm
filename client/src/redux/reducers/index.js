import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { users } from './usersReducer';
import { cart } from './cartReducers';


const rootReducer = combineReducers({
  authentication,
  users,
  cart,

});

export default rootReducer;
