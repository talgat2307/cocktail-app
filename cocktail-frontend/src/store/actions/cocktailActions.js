import { push } from 'connected-react-router';
import {
  ADD_COCKTAIL_FAIL,
  ADD_COCKTAIL_SUCCESS, DELETE_COCKTAIL_SUCCESS,
  FETCH_COCKTAIL_FAIL,
  FETCH_COCKTAIL_SUCCESS, PUBLISH_COCKTAIL_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const fetchCocktailSuccess = (cocktails) => {
  return { type: FETCH_COCKTAIL_SUCCESS, cocktails };
};

const fetchCocktailFail = (error) => {
  return { type: FETCH_COCKTAIL_FAIL, error };
};

export const fetchCocktails = () => {
  return async dispatch => {
    try {
      const response = await axiosApi('/cocktails');
      dispatch(fetchCocktailSuccess(response.data));
    } catch (e) {
      dispatch(fetchCocktailFail(e));
    }
  };
};

const addCocktailSuccess = () => {
  return { type: ADD_COCKTAIL_SUCCESS };
};

const addCocktailFail = (error) => {
  return { type: ADD_COCKTAIL_FAIL, error };
};

export const addCocktail = (data) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };
    try {
      await axiosApi.post('/cocktails', data, { headers });
      dispatch(addCocktailSuccess());
      setTimeout(() => dispatch(push('/')), 3000);
    } catch (e) {
      dispatch(addCocktailFail(e));
    }
  };
};

const deleteCocktailSuccess = (id) => {
  return { type: DELETE_COCKTAIL_SUCCESS, id };
};

export const deleteCocktail = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };

    await axiosApi.delete(`/cocktails/${id}`, { headers });
    dispatch(deleteCocktailSuccess(id));
  };
};

const publishCocktailSuccess = (id) => {
  return { type: PUBLISH_COCKTAIL_SUCCESS, id };
};

export const publishCocktail = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };

    await axiosApi.put(`/cocktails/${id}`, {}, { headers });
    dispatch(publishCocktailSuccess(id));
  };
};

