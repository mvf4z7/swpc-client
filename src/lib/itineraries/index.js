import { makeApiRequest, constants } from 'Lib/network';
const Methods = constants.methods;

export function list() {
  const options = {
    method: Methods.GET,
  };
  return makeApiRequest('/itineraries', options);
};

export default {
  list,
};