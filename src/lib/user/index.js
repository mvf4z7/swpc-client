import { makeApiRequest, constants } from  'Lib/network';
const Methods = constants.methods;

export async function login(email, password) {
  const options = {
    method: Methods.POST,
    body: { email, password },
    useAuth: false,
  };
  const { token } = await makeApiRequest('/login', options);
  
  return token;
}

export default {
  login,
};
