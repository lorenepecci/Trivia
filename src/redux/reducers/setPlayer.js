import { SET_ASSERTION, SET_PLAYER, SET_SCORE } from '../actions/setPlayerAction';

const player = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const setPlayer = (state = player, action) => {
  switch (action.type) {
  case SET_PLAYER:
    return {
      ...state,
      name: action.player.firstName,
      gravatarEmail: action.player.email,
    };
  case SET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case SET_ASSERTION:
    return {
      ...state,
      assertions: action.assertions,
    };

  default:
    return state;
  }
};
export default setPlayer;
