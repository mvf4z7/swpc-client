import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import Types from './actionTypes';

export const INITIAL_STATE = {
  fetchingAll: false,
  entities: {},
  entityIds: [],
  status: {},
  softUpdates: {},
  errors: [],
};

const DEFAULT_STATUS = {
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
      return { ...DEFAULT_STATUS };
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

  [Types.ITINERARIES_SOFT_UPDATES]: (state = INITIAL_STATE, action) => {
    const { id, updates: newUpdates } = action.payload;
    const currentUpdates = state.softUpdates[id] || {};
    const softUpdates = {
      ...state.softUpdates,
      [id]: {
        ...currentUpdates,
        ...newUpdates,
      },
    };

    return {
      ...state,
      softUpdates
    }
  },

  [Types.ITINERARIES_SOFT_UPDATES_RESET]: (state = INITIAL_STATE, action) => {
    const { id } = action.payload;

    return {
      ...state,
      softUpdates: _.omit(state.softUpdates, id),
    };
  },
};

export default createReducer(INITIAL_STATE, HANDLERS);