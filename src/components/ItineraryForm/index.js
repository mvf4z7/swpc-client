import React from 'react';

import Airports from 'Util/airports';

const airportOptions = Airports.map( airport => {
  return <option value={airport.code} key={airport.code}>{airport.name} ({airport.code})</option>
});

const propTypes = {
  itinerary: React.PropTypes.shape({
    
  }),
  airports: React.PropTypes.arrayOf(React.PropTypes.shape({

  })),
};

const ItineraryForm = ({ itinerary, onChange, onReset }) => {
  return (
    <div>
      <form>
        <div className="form-group row">
          <div className="col-sm-6">
            <label htmlFor="formGroupExampleInput1">Origin</label>
            <select
              className="form-control"
              name="origin_airport"
              value={itinerary.origin_airport}
              onChange={ evt =>  onChange(itinerary.id, buildUpdateObj(evt)) }>
              { airportOptions }
            </select>
          </div>
          <div className="col-sm-6">
            <label htmlFor="formGroupExampleInput2">Destination</label>
            <select
              className="form-control"
              name="destination_airport"
              value={itinerary.destination_airport}
              onChange={ evt => onChange(itinerary.id, buildUpdateObj(evt)) }>
              { airportOptions }
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Destination</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
        </div>
      </form>
    </div>
  );
};

function buildUpdateObj(evt) {
  return {
    [evt.target.name]: evt.target.value,
  };
}

export default ItineraryForm;

ItineraryForm.propTypes = propTypes;