import { createTypes } from 'reduxsauce';
import actionFactory from 'Util/actionFactory';

export default createTypes(`
  ${actionFactory.async('ITINERARIES_LIST')}
  ${actionFactory.async('ITINERARIES_GET')}
`);