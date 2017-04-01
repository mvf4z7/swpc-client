import Types from './actionTypes';

export function loginSuccess() {
  return {
    type: Types.LOGIN_SUCCESS,
  };
}

export default {
  loginSuccess,
};