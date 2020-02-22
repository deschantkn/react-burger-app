import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} = actionTypes;

const addIngredient = (state, { payload }) => {
  const updatedIngredient = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, { payload }) => {
  const updatedIng = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, { payload }) => {
  return updateObject(state, {
    ingredients: payload.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientsFailed = state => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action);
    case REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case SET_INGREDIENTS:
      return setIngredients(state, action);
    case FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
