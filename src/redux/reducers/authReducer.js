// reducers/authReducer.js
import { SET_TOKEN, CLEAR_TOKEN } from "../actions/authActions";

const initialState = {
  token: null,
  nickname: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        token: null,
      };
    case 'SET_NICKNAME': // 추가
      return {
       ...state, nickname: action.payload 
      };
    default:
      return state;
  }
};

export default authReducer;
