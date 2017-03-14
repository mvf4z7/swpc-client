import React from 'react';

import { setToken } from '../util/auth';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="you@domain.com" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }

  onSubmit(evt) {
    evt.preventDefault();
    setToken('foobar');
  }
}
