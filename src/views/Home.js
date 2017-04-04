import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchItineraries } from 'ReduxModules/itineraries/actionCreators';


export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.renderItineraries = this.renderItineraries.bind(this);
  }

  componentDidMount() {
    this.props.fetchItineraries();
  }

  render() {
    const { 
      fetchingAll,
      itineraries
    } = this.props;
    return (
      <div>
        <div>Home View</div>
        <Link to="/login">Go to login page</Link>
        { this.renderItineraries() }
      </div>
    );
  }

  renderItineraries() {
    const {
      fetchingAll,
      itineraries,
    } = this.props;

    if(fetchingAll) {
      return (
        <div>Loading...</div>
      );
    } else {
      return itineraries.map( itinerary => {
        return (
          <li key={itinerary.id}>{JSON.stringify(itinerary)}</li>
        );
      });
    }
  }
}

const mapStateToProps = (state) => {
  const itineraries = _.map(state.itineraries.entityIds, id => {
    return state.itineraries.entities[id];
  });
  const errors = state.itineraries.errors;
  const fetchingAll = state.itineraries.fetchingAll;

  return {
    fetchingAll,
    itineraries,
    errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItineraries: () => dispatch(fetchItineraries()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
