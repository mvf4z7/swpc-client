import { makeApiRequest, constants } from 'Lib/network';
const Methods = constants.methods;

export function list() {
  const options = {
    method: Methods.GET,
  };
  return makeApiRequest('/itineraries', options);
};

export function update(id, updates) {
  const options = {
    method: Methods.PUT,
    body: updates
  };
  return makeApiRequest(`/itineraries/${id}`, options);
}

export default {
  list,
  update,
};