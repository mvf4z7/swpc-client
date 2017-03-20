import React from 'react';

import User from '../lib/user';
import { setToken } from '../util/auth';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      error: undefined,
    };
  }

  render() {
    const { 
      email,
      password,
      error,
    } = this.state;

    return (
      <div>
        {
          error
            ? <ErrorContainer error={error} />
            : null
        }
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              placeholder="you@domain.com"
              onChange={(evt) => this.onChange('email', evt)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(evt) => this.onChange('password', evt)} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }

  onChange(key, evt) {
    const value = evt.target.value;
    this.setState({
      [key]: value
    });
  }

  async onSubmit(evt) {
    evt.preventDefault();
    const {
      email,
      password,
    } = this.state;
    const { history } = this.props;

    try {
      const data = await User.login(email, password);
      setToken(data.token);
      history.push('/');
    } catch(error) {
      this.setState({
        email: '',
        password: '',
        error: error.message,
      });
    }
  }
}

const ErrorContainer = ({ error }) => {
  const styles = {
    color: 'red',
    fontWeight: 'bold',
  };

  return (
    <div style={styles}>{error}</div>
  );
}
