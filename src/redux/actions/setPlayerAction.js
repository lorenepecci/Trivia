export const SET_PLAYER = 'SET_USER';
export const SET_SCORE = 'SET_SCORE';
export const SET_ASSERTION = 'SET_ASSERTION';

export const setPlayerAction = (player) => ({
  type: SET_PLAYER, player,
});
export const setScoreAction = (score) => ({
  type: SET_SCORE, score,
});
export const setAssertionAction = (assertions) => ({
  type: SET_ASSERTION, assertions,
});
