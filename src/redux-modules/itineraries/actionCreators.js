import Types from './actionTypes';
import Itineraries from 'Lib/itineraries';


export function fetchItineraries() {
  return async (dispatch) => {
    dispatch(listRequest());
    try {
      const itineraries = await Itineraries.list();
      dispatch(listSuccess(itineraries));
    } catch(e) {
      dispatch(listFailure(e.message));
    }
  };
}

export function listRequest() {
  return {
    type: Types.ITINERARIES_LIST_REQUEST,
  };
}

export function listSuccess(data) {
  return {
    type: Types.ITINERARIES_LIST_SUCCESS,
    payload: data,
  };
}

export function listFailure(error) {
  return {
    type: Types.ITINERARIES_LIST_FAILURE,
    payload: error,
    error: true,
  };
}

export function softUpdateItinerary(id, updates) {
  return {
    type: Types.ITINERARIES_SOFT_UPDATES,
    payload: { id, updates },
  };
}

export function softUpdateItineraryReset(id) {
  return {
    type: Types.ITINERARIES_SOFT_UPDATES_RESET,
    payload: { id },
  };
}

export default {
  fetchItineraries,
  listRequest,
  listSuccess,
  listFailure,

  softUpdateItinerary,
  softUpdateItineraryReset,
};