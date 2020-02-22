import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FECTH_ORDERS_SUCCESS,
  FECTH_ORDERS_FAIL,
  FECTH_ORDERS_START
} from './actionTypes';
import axios from '../../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    payload: { orderId: id, orderData }
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: PURCHASE_BURGER_FAIL,
    payload: { error }
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const { data } = await axios.post(
        '/orders.json?auth=' + token,
        orderData
      );
      dispatch(purchaseBurgerSuccess(data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: FECTH_ORDERS_SUCCESS,
    payload: { orders }
  };
};

export const fetchOrdersFail = error => {
  return {
    type: FECTH_ORDERS_FAIL,
    payload: { error }
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FECTH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    try {
      const response = await axios.get('/orders.json' + queryParams);
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
};
