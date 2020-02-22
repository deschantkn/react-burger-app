import axios from 'axios';

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from './actionTypes';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = data => {
  return {
    type: AUTH_SUCCESS,
    payload: { token: data.idToken, userId: data.localId }
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    payload: { error }
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true
      };
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXo4jPsK7lmJxP2CuQ2ndHcGPuE1GxP3M';
      if (!isSignup) {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXo4jPsK7lmJxP2CuQ2ndHcGPuE1GxP3M';
      }
      const { data } = await axios.post(url, authData);
      const exprirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('expirationTime', exprirationDate);
      localStorage.setItem('userId', data.localId);
      dispatch(authSuccess(data));
      dispatch(checkAuthTimeout(data.expiresIn));
    } catch (error) {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    payload: { path }
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationTime'));
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
