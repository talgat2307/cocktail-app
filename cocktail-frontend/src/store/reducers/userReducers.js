import {
  LOGOUT_USER,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from '../actionTypes';

const initialState = {
  loginError: null,
  userInfo: null,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, userInfo: action.user };
    case USER_LOGIN_FAILURE:
      return { ...state, loginError: action.error };
    case LOGOUT_USER:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default userReducers;