import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import Types from './actionTypes';

export const INITIAL_STATE = {
  fetchingAll: false,
  entities: {},
  status: {},
  softUpdates: {},
  errors: [],
};

const defaultStatus = {
  loading: false,
};

export const HANDLERS = {
  [Types.ITINERARIES_LIST_REQUEST]: (state = INITIAL_STATE, action) => {
    const status = _.mapValues(state.status, e => {
      return { ...e, loading: true };
    });
    
    return {
      ...state,
      fetchingAll: true,
      status
    };
  },

  [Types.ITINERARIES_LIST_SUCCESS]: (state = INITIAL_STATE, action) => {
    const entities = _.keyBy(action.payload, 'id');
    const entityIds = _.map(action.payload, 'id');
    const status = _.mapValues(entities, e => {
      return { ...defaultStatus };
    });

    return {
      ...state,
      fetchingAll: false,
      entities,
      entityIds,
      status,
      softUpdates: {},
      errors: [],
    };
  },

  [Types.ITINERARIES_LIST_FAILURE]: (state = INITIAL_STATE, action) => {
    const status = _.mapValues(state.status, e => {
      return { ...e, loading: false };
    });
    const newErrors = _.isArray(action.payload) ? action.payload : [ action.payload ];

    return {
      ...state,
      fetchingAll: false,
      status,
      errors: [
        ...state.errors,
        ...newErrors,
      ]
    };
  },
};

export default createReducer(INITIAL_STATE, HANDLERS);