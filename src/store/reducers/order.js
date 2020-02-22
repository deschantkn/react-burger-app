import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FECTH_ORDERS_START,
  FECTH_ORDERS_SUCCESS,
  FECTH_ORDERS_FAIL
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = state => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = state => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, { payload }) => {
  const newOrder = updateObject(payload.orderData, { id: payload.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFail = state => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = state => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, { payload }) => {
  return updateObject(state, { orders: payload.orders, loading: false });
};

const fetchOrdersFail = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PURCHASE_INIT:
      return purchaseInit(state);
    case PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case FECTH_ORDERS_START:
      return fetchOrdersStart(state);
    case FECTH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case FECTH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    default:
      return state;
  }
};

export default reducer;
