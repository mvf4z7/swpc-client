import Types from './actionTypes';

import User from 'Lib/user';
import { setToken } from 'Util/authHelpers';

export function login(email, password) {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const token = await User.login(email, password);
      setToken(token);
      dispatch(loginSuccess());
    } catch(error) {
      dispatch(loginFailure(error));
    }
  };
}

export function loginRequest() {
  return {
    type: Types.LOGIN_REQUEST,
  };
}

export function loginSuccess() {
  return {
    type: Types.LOGIN_SUCCESS,
  };
}

export function loginFailure(error) {
  return {
    type: Types.LOGIN_FAILURE,
    payload: error,
    error: true,
  };
}

export default {
  login,
  loginRequest,
  loginSuccess,
  loginFailure,
};