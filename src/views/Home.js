import React from 'react';
import { Link } from 'react-router-dom';

import { makeApiRequest } from '../lib/network';


export default class Home extends React.Component {

  componentDidMount() {
    makeApiRequest('/user')
      .then( data => console.log(data))
      .catch( err => console.error(err));
  }

  render() {
    return (
      <div>
        <div>Home View</div>
        <Link to="/login">Go to login page</Link>
      </div>
    );
  }
}
