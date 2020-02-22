import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from './actionTypes';
import axios from '../../../axios-order';

export const addIngredient = name => {
  return {
    type: ADD_INGREDIENT,
    payload: { ingredientName: name }
  };
};

export const removeIngredient = name => {
  return {
    type: REMOVE_INGREDIENT,
    payload: { ingredientName: name }
  };
};

export const setIngredients = ingredients => {
  return {
    type: SET_INGREDIENTS,
    payload: { ingredients }
  };
};

export const fetchIngredientsFailed = error => {
  return {
    type: FETCH_INGREDIENTS_FAILED,
    payload: { error }
  };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/ingredients.json');
      dispatch(setIngredients(data));
    } catch (error) {
      dispatch(fetchIngredientsFailed(error));
    }
  };
};
