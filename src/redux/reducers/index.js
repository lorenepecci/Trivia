import { combineReducers } from 'redux';
import token from './setToken';
import player from './setPlayer';

const rootReducer = combineReducers({ player, token });

export default rootReducer;
