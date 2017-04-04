import { combineReducers } from 'redux';

import auth from 'ReduxModules/auth/reducer';
import itineraries from 'ReduxModules/itineraries/reducer';

const rootReducer = combineReducers({
  auth,
  itineraries,
});

export default rootReducer;