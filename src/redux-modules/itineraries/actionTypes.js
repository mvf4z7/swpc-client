import { createTypes } from 'reduxsauce';
import actionFactory from 'Util/actionFactory';

export default createTypes(`
  ${actionFactory.async('ITINERARIES_LIST')}
  ${actionFactory.async('ITINERARIES_GET')}

  ITINERARIES_SOFT_UPDATES
  ITINERARIES_SOFT_UPDATES_RESET
`);