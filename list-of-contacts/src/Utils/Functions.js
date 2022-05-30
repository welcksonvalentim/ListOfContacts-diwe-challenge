import Axios from 'axios';
const API_ENDPOINT = 'https://contacts-api.prd.parceirodaconstrucao.com.br/auth/login';

export async function sendLoginInputs(add) {
  const result = await Axios.post(API_ENDPOINT, add).then((resp) => resp.data);
  return result;
};

export async function getAllList() {
  const result = await Axios.get(API_ENDPOINT).then((resp) => resp.data);
  return result;
};