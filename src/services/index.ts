import axios from 'axios';

const {
  REACT_APP_API_HOST,
  REACT_APP_API_VERSION,
} = process.env;

const client = axios.create({
  baseURL: `${REACT_APP_API_HOST}/${REACT_APP_API_VERSION}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use((response) => response.data, (error) => {
  let {
    data: { data: { message } },
  } = error.response ? error.response : ({ data: { data: error } });

  if (error.response && error.response.status === 500) {
    message = 'Something went wrong';
  }

  return Promise.reject(message);
});

export default client;
