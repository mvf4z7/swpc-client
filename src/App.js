import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import conditionalRedirectRoute from 'Components/hoc/conditionRedirectRoute';
import auth from 'Util/auth';

const AuthedRoute = conditionalRedirectRoute( () => {
  const token = auth.getToken();
  return !token;
}, { redirectPath: '/login' });

const RedirectIfAuthed = conditionalRedirectRoute( () => {
  const token = auth.getToken();
  return !!token;
}, { redirectPath: '/' });

import Home from './views/Home';
import Login from './views/Login';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <div>SWPC Client</div>
          </div>
          <br /><br />

          <AuthedRoute path="/" exact component={Home} />
          <RedirectIfAuthed path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
