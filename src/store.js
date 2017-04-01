import { 
  combineReducers,
  createStore, 
} from 'redux';
import auth from './util/auth';
import authActions from './redux-modules/auth/actionCreators';

const isDevelop = process.env.NODE_ENV !== 'production';

// import reducers
import authReducer from './redux-modules/auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const INITIAL_STATE = {};

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  // enable Redux dev tools in non-production environments
  isDevelop
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

// TODO: verify token is valid on server before
// sending dispatching action for login
const token = auth.getToken();
if(token) {
  store.dispatch(authActions.loginSuccess());
};

export default store;
