import { 
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import { getToken } from './util/authHelpers';
import { loginSuccess } from './redux-modules/auth/actionCreators';
const isDevelop = process.env.NODE_ENV !== 'production';

import rootReducer from 'ReduxModules/rootReducer';

const composeEnhancers =
  isDevelop &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
);

const store = createStore(
  rootReducer,
  enhancer,
);

// TODO: verify token is valid on server before
// sending dispatching action for login
const token = getToken();
if(token) {
  store.dispatch(loginSuccess());
};

export default store;
