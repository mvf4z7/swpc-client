import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  fetchItineraries,
  updateItinerary,
  softUpdateItinerary,
  softUpdateItineraryReset,
} from 'ReduxModules/itineraries/actionCreators';

import ItineraryForm from 'Components/ItineraryForm';
import CreateItinerary from 'Components/CreateItinerary';


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
        <CreateItinerary />
        { this.renderItineraries() }
      </div>
    );
  }

  renderItineraries() {
    const {
      fetchingAll,
      itineraries,
      updateItinerary,
      softUpdateItinerary,
      resetSoftUpdates,
      modifiedIds,
    } = this.props;

    if(fetchingAll) {
      return (
        <div>Loading...</div>
      );
    } else {
      return itineraries.map( itinerary => {
        const isModified = modifiedIds.indexOf(itinerary.id) !== -1;
        return (
          <ItineraryForm
            itinerary={itinerary}
            onChange={softUpdateItinerary}
            onReset={resetSoftUpdates}
            onSave={updateItinerary}
            isModified={isModified}
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
  const modifiedIds = Object.keys(state.itineraries.softUpdates).map( strId => parseInt(strId));
  const errors = state.itineraries.errors;
  const fetchingAll = state.itineraries.fetchingAll;

  return {
    fetchingAll,
    itineraries,
    modifiedIds,
    errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItineraries: () => dispatch(fetchItineraries()),
    updateItinerary: (id, updates) => dispatch(updateItinerary(id, updates)),
    softUpdateItinerary: (id, updates) => dispatch(softUpdateItinerary(id, updates)),
    resetSoftUpdates: id => dispatch(softUpdateItineraryReset(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
