import { SET_TOKEN } from '../actions/setTokenAction';

const token = '';

const setToken = (state = token, action) => {
  switch (action.type) {
  case SET_TOKEN:
    return action.token.token;
  default:
    return state;
  }
};

export default setToken;
