import React from 'react';
import { connect } from 'react-redux';

import User from 'Lib/user';
import authHelpers from 'Util/authHelpers';
import { login } from 'ReduxModules/auth/actionCreators';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Should not happen, but safe guard against
    // a logged in user getting to the login page.
    const {
      loggedIn, 
      history,
    } = this.props;
    if(loggedIn) history.push('/');

    this.state = {
      email: '',
      password: '',
      error: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if(nextProps.loggedIn) {
      history.push('/');
    }

    if(nextProps.errors.length) {
      this.setState({
        email: '',
        password: '',
      });
    }
  }

  render() {
    const { 
      email,
      password,
    } = this.state;
    const { errors } = this.props

    return (
      <div>
        <ErrorContainer errors={errors} />
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

  onSubmit(evt) {
    evt.preventDefault();

    const {
      email,
      password,
    } = this.state;
    const { login } = this.props;

    login(email, password)
  }
}

const ErrorContainer = ({ errors }) => {
  if(!errors.length) {
    return null;
  }

  const styles = {
    color: 'red',
    fontWeight: 'bold',
  };
  return (
    <div style={styles}>
      {
        errors.map( (error, idx) => <div key={Math.random()}>{error}</div> )
      }
    </div>
  );
}

const  mapStateToProps = (state) => {
  return state.auth;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
