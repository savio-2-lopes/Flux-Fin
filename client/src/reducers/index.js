import { combineReducers } from 'redux';
import kambam from './kambam';
import alert from './alert';
import auth from './auth';
export default combineReducers({ alert, auth, kambam });