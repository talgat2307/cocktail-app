import { push } from 'connected-react-router';
import {
  LOGOUT_USER,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const userLoginSuccess = (user) => {
  return { type: USER_LOGIN_SUCCESS, user };
};

const userLoginFailure = (error) => {
  return { type: USER_LOGIN_FAILURE, error };
};


export const facebookLogin = data => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('/users/facebookLogin', data);
      dispatch(userLoginSuccess(response.data));
      dispatch(push('/'));
    } catch (e) {
      dispatch(userLoginFailure(e));
    }
  }
};

const logoutUser = () => {
  return { type: LOGOUT_USER };
};

export const logout = () => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };

    await axiosApi.delete('users/sessions', { headers });
    dispatch(logoutUser());
    dispatch(push('/'));
  };
};