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
  }
}

export default {
  fetchItineraries,
  listRequest,
  listSuccess,
  listFailure,
};