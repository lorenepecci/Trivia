export const SET_TOKEN = 'SET_TOKEN';
const setTokenAction = (token) => ({
  type: SET_TOKEN,
  token,
});

const fetchToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  localStorage.setItem('token', JSON.stringify(json));
  dispatch(setTokenAction(json));
};

export default fetchToken;
