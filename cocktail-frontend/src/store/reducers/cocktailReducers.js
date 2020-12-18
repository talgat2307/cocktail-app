import {
  DELETE_COCKTAIL_SUCCESS,
  FETCH_COCKTAIL_FAIL,
  FETCH_COCKTAIL_SUCCESS, PUBLISH_COCKTAIL_SUCCESS,
} from '../actionTypes';

const initialState = {
  error: null,
  cocktails: null,
};

const cocktailReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COCKTAIL_SUCCESS:
      return { ...state, cocktails: action.cocktails };
    case FETCH_COCKTAIL_FAIL:
      return { ...state, error: action.error };
    case DELETE_COCKTAIL_SUCCESS:
      return {
        ...state,
        cocktails: state.cocktails.filter(
          cocktail => cocktail._id !== action.id),
      };
    case PUBLISH_COCKTAIL_SUCCESS:
      const index = state.cocktails.findIndex(
        cocktail => cocktail._id === action.id);
      if (index !== -1) {
        const copyState = [...state.cocktails];
        const copyObj = { ...copyState[index] };
        copyObj.published = true;
        copyState[index] = copyObj;
        return { ...state, cocktails: copyState };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default cocktailReducers;