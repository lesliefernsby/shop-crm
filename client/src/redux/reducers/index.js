import { combineReducers } from 'redux';

import { authentication } from './authReducer';


const rootReducer = combineReducers({
  authentication,

});

export default rootReducer;
