// https://github.com/reactjs/redux/blob/master/examples/real-world/src/middleware/api.js
import { normalize } from 'normalizr';
import { baseUrl } from "../url"

/**
 * callApi - api client
 *
 * @export
 * @param {string} endpoint
 * @param {string} [method='GET']
 * @param {object} body
 * @param {any} schema to normalize the request and response
 * @param {any} responseSchema for when the response type differs
 * @returns promise
 */
export function callApi(
  endpoint,
  method = 'GET',
  schema,
  responseSchema,
  options = { accept: 'json' }
) {
  let fullUrl = baseUrl + endpoint;

  return fetch(fullUrl, {
    method,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_THEMOVIEDB_ACCESS_TOKEN}`
    },
    credentials: 'same-origin'
  }).then(response => {
    return options.accept !== 'json' ? response : response.json().then(json => {
      if (!response.ok)
        return Promise.reject({ ...json, status: response.status });
      if (responseSchema) return normalize(json, responseSchema);
      if (schema) return normalize(json, schema);
      return json;
    })
  })
}

