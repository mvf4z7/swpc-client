import Auth from '../../util/auth';

const API_ROOT = APP_ENV.API_ROOT;
const API_VERS = APP_ENV.API_VERS

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
    .then( response => {
      if(!response.ok) {
        Promise.reject(response)
      }

      return response.json();
    });
}

export function makeApiRequest(path, options = {}) {
  path = `${API_ROOT}${API_VERS}${path}`;
  const token = Auth.getToken();

  if(!options.headers) {
    options.headers = {
      'Authorization': `JWT ${token}`
    };
  } else if(!options.headers['Authorization']) {
    options.headers['Authorization'] = `JWT ${token}`;
  }

  return makeRequest(path, options)
}
