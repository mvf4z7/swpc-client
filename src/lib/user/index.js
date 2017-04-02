import { makeApiRequest, constants } from  'Lib/network';
const Methods = constants.methods;

export function login(email, password) {
  const options = {
    method: Methods.POST,
    body: { email, password },
    useAuth: false,
  };
  return makeApiRequest('/login', options);
}

export default {
  login,
};
