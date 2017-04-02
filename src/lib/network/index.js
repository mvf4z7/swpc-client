import Auth from 'Util/auth';
import _ from 'lodash';

const API_ROOT = APP_ENV.API_ROOT;
const API_VERS = APP_ENV.API_VERS

export const constants = {
  methods: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },
};

export function makeRequest(path, options) {
  options.method = options.method || 'GET';
  if(options.method === 'POST' && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  if(!options.headers) {
    options.headers = {
      'Content-Type': 'application/json'
    };
  } else if(!options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json';
  }

  return fetch(path, options)
    .then( async response => {
      const json = await response.json();
      if(!response.ok) {    
        return Promise.reject(json);
      }
      
      return json;
    });
}

/*
 * path parameter should include a leading slash
 *  e.g. /login
*/

export function makeApiRequest(path, options = {}) {
  const useAuth = options.useAuth !== undefined
    ? options.useAuth
    : true;
  const fullPath = useAuth 
    ? `${API_ROOT}${API_VERS}${path}`
    : `${API_ROOT}${path}`;
  const token = useAuth
    ? Auth.getToken()
    : undefined;

  if(useAuth && !options.headers) {
    options.headers = {
      'Authorization': `JWT ${token}`
    };
  } else if(useAuth && !options.headers['Authorization']) {
    options.headers['Authorization'] = `JWT ${token}`;
  }

  return makeRequest(fullPath, options)
}

export default {
  makeRequest,
  makeApiRequest,
};
