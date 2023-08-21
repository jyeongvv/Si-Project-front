export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

export const setTokenAction = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const clearTokenAction = () => ({
  type: CLEAR_TOKEN,
});

export const setNicknameAction = (nickname) => {
  return {
    type: 'SET_NICKNAME',
    payload: nickname,
  };
};