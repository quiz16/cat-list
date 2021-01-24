import axios from 'axios';

const {
  REACT_APP_API_HOST,
  REACT_APP_API_VERSION,
  REACT_APP_API_KEY,
} = process.env;

const client = axios.create({
  baseURL: `${REACT_APP_API_HOST}/${REACT_APP_API_VERSION}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': REACT_APP_API_KEY,
  },
});

client.interceptors.response.use((response) => response, (error) => {
  let {
    data: { data: { message } },
  } = error.response ? error.response : ({ data: { data: error } });

  if (error.response && error.response.status === 500) {
    message = 'Something went wrong';
  }

  return Promise.reject(message);
});

export default client;
