import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { users } from './usersReducer';


const rootReducer = combineReducers({
  authentication,
  users

});

export default rootReducer;
