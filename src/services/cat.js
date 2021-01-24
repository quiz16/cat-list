import client from './index';

export const fetchBreed = () => client.get('/breeds');
export const search = ({ page, limit, breed_id }) => client.get(
`/images/search?page=${page}&limit=${limit}&breed_id=${breed_id}`
);
export const fetchCatById = (id) => client.get(`/images/${id}`);

