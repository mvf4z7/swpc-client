import { createTypes } from 'reduxsauce';
import actionFactory from 'Util/actionFactory';

export default createTypes(`
  ${actionFactory.async('LOGIN')}
`);