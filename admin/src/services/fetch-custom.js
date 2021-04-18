import fetch from 'node-fetch';

var fetchAbsolute = require('fetch-absolute');

let url;
if (process.env.NODE_ENV === 'production') {
  url = 'https://app.herokuapp.com';
} else {
  url = 'http://localhost:2002';
}

const fetchApi = fetchAbsolute(fetch)(url);
export default fetchApi;
