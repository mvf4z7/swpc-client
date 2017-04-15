import React from 'react';
import glamorous from 'glamorous';
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

const Wrapper = glamorous.div({
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid gray',
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

const ItineraryForm = ({ itinerary, onChange, onReset, isModified }) => {
  return (
    <Wrapper>
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
      {
        isModified ? (
          <ButtonContainer>
            <CancelButton onClick={() => onReset(itinerary.id)}>RESET CHANGES</CancelButton>
            <SaveButton>SAVE CHANGES</SaveButton>
          </ButtonContainer>
        ) : null
      }
    </Wrapper>
  );
};

function buildUpdateObj(evt) {
  return {
    [evt.target.name]: evt.target.value,
  };
}

ItineraryForm.propTypes = propTypes;

export default ItineraryForm;