import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-189a9.firebaseio.com/'
});

export default instance;
