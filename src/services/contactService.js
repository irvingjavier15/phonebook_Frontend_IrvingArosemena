import axios from 'axios';

const API_URL = 'http://localhost:3001/contacts';

export const fetchContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
