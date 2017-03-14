import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import { getToken } from '../util/auth';

const AuthedRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={ props => {
      const token = getToken();

      return (
        token
          ? React.createElement(component, props)
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      );
    }} />
  );
};

export default AuthedRoute;
