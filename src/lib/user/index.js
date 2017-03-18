import { makeApiRequest, constants } from  '../network';
const methods = constants.methods;

export function login(email, password) {
  const options = {
    method: methods.POST,
    body: { email, password },
    useAuth: false,
  };
  return makeApiRequest('/login', options);
}

export default {
  login,
};
