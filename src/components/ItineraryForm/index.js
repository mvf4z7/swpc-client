import React from 'react';
import _ from 'lodash';
import glamorous from 'glamorous';
import Airports from 'Util/airports';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const airportOptions = Airports.map( airport => {
  return <option value={airport.code} key={airport.code}>{airport.name} ({airport.code})</option>
});

const propTypes = {
  itinerary: React.PropTypes.shape({
    
  }),
  airports: React.PropTypes.arrayOf(React.PropTypes.shape({

  })),
};

const Wrapper = glamorous.div({
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid gray',
});

const DatePickerLabel = glamorous.label({
  display: 'block',
});

const ButtonContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
});

const baseButtonStyles = {
  width: '10em',
  padding: '1em',
  margin: '0em 1em',
};
const SaveButton = glamorous.button({
  ...baseButtonStyles,
  backgroundColor: 'green',
});
const CancelButton = glamorous.button({
  ...baseButtonStyles,
  backgroundColor: 'red',
});

const ItineraryForm = ({ itinerary, onChange, onReset, onSave, isModified }) => {

  return (
    <Wrapper>
      <form>
        <div>id: {itinerary.id}</div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label htmlFor={`origin_airport_${itinerary.id}`}>Origin</label>
            <select
              className="form-control"
              id={`origin_airport_${itinerary.id}`}
              name="origin_airport"
              value={itinerary.origin_airport}
              onChange={ evt =>  onChange(itinerary.id, buildUpdateObj(evt)) }>
              { airportOptions }
            </select>
          </div>
          <div className="col-sm-6">
            <label htmlFor={`destination_airport_${itinerary.id}`}>Destination</label>
            <select
              className="form-control"
              id={`destination_airport_${itinerary.id}`}
              name="destination_airport"
              value={itinerary.destination_airport}
              onChange={ evt => onChange(itinerary.id, buildUpdateObj(evt)) }>
              { airportOptions }
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6 text-center">
            <DatePickerLabel>DEPART DATE</DatePickerLabel>
            <DatePicker
              selected={moment(itinerary.outbound_date, 'MM/DD/YYYY')}
              onChange={ date => onChange(itinerary.id, buildDateUpdateObj('outbound_date', date)) } />
          </div>
          <div className="col-sm-6 text-center">
            <DatePickerLabel>RETURN DATE</DatePickerLabel>
            <DatePicker
              selected={moment(itinerary.return_date, 'MM/DD/YYYY')}
              onChange={ date => onChange(itinerary.id, buildDateUpdateObj('return_date', date)) } />
          </div>
        </div>
      </form>
      {
        isModified ? (
          <ButtonContainer>
            <CancelButton onClick={() => onReset(itinerary.id)}>RESET CHANGES</CancelButton>
            <SaveButton onClick={() => onSave(itinerary.id, transformForSave(itinerary))}>SAVE CHANGES</SaveButton>
          </ButtonContainer>
        ) : null
      }
    </Wrapper>
  );
};

ItineraryForm.propTypes = propTypes;
export default ItineraryForm;

function buildUpdateObj(evt) {
  return {
    [evt.target.name]: evt.target.value,
  };
}

function buildDateUpdateObj(name, momentObj) {
  return {
    [name]: momentObj.format('MM/DD/YYYY'),
  };
}

function transformForSave(itinerary) {
  const data =  _.pick(itinerary, [
    'two_way_trip',
    'origin_airport',
    'destination_airport',
    'outbound_date',
    'return_date',
    'adult_passenger_count',
  ]);
  return data;
}