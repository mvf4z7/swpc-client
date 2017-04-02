import React from 'react';
import { Link } from 'react-router-dom';

import { makeApiRequest } from 'Lib/network';
import Itineraries from 'Lib/itineraries';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      itineraries: [],
      errors: [],
    };
  }

  async componentDidMount() {
    try {
      const itineraries = await Itineraries.list();
      this.setState({ itineraries });
    } catch(e) {
      console.error(e);
      const errors = [
        ...this.state.errors,
        e.message,
      ];
      this.setState({ errors });
    }
  }

  render() {
    const { itineraries } = this.state;
    return (
      <div>
        <div>Home View</div>
        <Link to="/login">Go to login page</Link>
        <ul>
          {
            itineraries.map( itinerary => {
              return (
                <li key={itinerary.id}>{JSON.stringify(itinerary)}</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
