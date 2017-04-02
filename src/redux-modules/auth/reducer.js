import { createReducer } from 'reduxsauce';
import Types from './actionTypes';

export const INITIAL_STATE = {
  loggedIn: false,
  fetchingToken: false,
  errors: [],
};

export const HANDLERS = {
  [Types.LOGIN_REQUEST]: (state = INITIAL_STATE, action) => {
    return {
      ...state,
      loggedIn: false,
      fetchingToken: true,
      errors: [],
    };
  },

  [Types.LOGIN_SUCCESS]: (state = INITIAL_STATE, action) => {
    return {
      ...state,
      loggedIn: true,
      fetchingToken: false,
      errors: [],
    };
  },

  [Types.LOGIN_FAILURE]: (state = INITIAL_STATE, action) => {
    const error = action.payload;
    const errors = error.message
      ? [ error.message ]
      : [ 'An error occurred while attempting to login.' ];

    return {
      ...state,
      loggedIn: false,
      fetchingToken: false,
      errors: errors
    };
  },
};

export default createReducer(INITIAL_STATE, HANDLERS);