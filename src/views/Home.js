import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  fetchItineraries,
  softUpdateItinerary
} from 'ReduxModules/itineraries/actionCreators';

import ItineraryForm from 'Components/ItineraryForm';


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
      <div className="container">
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
      softUpdateItinerary,
    } = this.props;

    if(fetchingAll) {
      return (
        <div>Loading...</div>
      );
    } else {
      return itineraries.map( itinerary => {
        return (
          <ItineraryForm
            itinerary={itinerary}
            onChange={softUpdateItinerary}
            key={itinerary.id} />
        );
      });
    }
  }
}

const mapStateToProps = (state) => {
  const itineraries = _.map(state.itineraries.entityIds, id => {
    const updates = state.itineraries.softUpdates[id] || {};
    return {
      ...state.itineraries.entities[id],
      ...updates,
    };
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
    softUpdateItinerary: (id, updates) => dispatch(softUpdateItinerary(id, updates)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
