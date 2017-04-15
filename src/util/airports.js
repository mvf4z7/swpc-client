import airports from 'airports';
import _ from 'lodash';

const NORTH_AMERICA = 'NA';
const AIRPORT = 'airport';
const LARGE = 'large';
const OPEN = 1;
const US = "US";

const filterObj = {
  continent: NORTH_AMERICA,
  type: AIRPORT,
  size: LARGE,
  status: OPEN,
  iso: US,
};

const FilteredAirports = airports
  .filter( airport => {
    const keys = _.keys(filterObj);
    return _.isEqual(_.pick(airport, keys), filterObj);
  })
  .map( airport => {
    return {
      code: airport.iata,
      lat: airport.lat,
      lon: airport.lon,
      name: airport.name,
    };
  });

export default FilteredAirports;