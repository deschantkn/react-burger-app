import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authStart = (state, { payload }) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, { payload }) => {
  return updateObject(state, {
    token: payload.token,
    userId: payload.userId,
    error: null,
    loading: false
  });
};

const authFail = (state, { payload }) => {
  return updateObject(state, { error: payload.error, loading: false });
};

const authLogout = state => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, { payload }) => {
  return updateObject(state, { authRedirectPath: payload.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state);
    case SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
