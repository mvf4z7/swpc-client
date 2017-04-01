import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

export default function conditionalRedirectRoute(redirectFunc, options = {}) {
  const ConditionalRedirectRoute = ({ component, redirectPath, ...rest }) => {
    return (
      <Route {...rest} render={ props => {
        const shouldRedirect = redirectFunc();
        return (
          shouldRedirect
            ? <Redirect to={{
               pathname: options.redirectPath || redirectPath,
               state: { from: props.location }
              }} />
            : React.createElement(component, props)
        );
      }} />
    );
  };

  if(options.displayName) {
    ConditionalRedirectRoute.displayName = options.displayName;
  }

  return ConditionalRedirectRoute;
}