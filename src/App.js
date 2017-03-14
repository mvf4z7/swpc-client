import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import AuthedRoute from './components/AuthedRoute';

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
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
