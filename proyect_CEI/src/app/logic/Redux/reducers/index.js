
import { combineReducers } from 'redux';
import ninoReducer from './ninoReducer';
import donerReducer from './donerReducer';
import authReducer from './authReducer';

export default combineReducers({
    nino: ninoReducer,
    doner: donerReducer,
    auth: authReducer,
});
