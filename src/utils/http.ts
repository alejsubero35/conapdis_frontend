import axios from 'axios';
import session from '@/store/modules/sessionModule';
import store from '@/store';
import Swal from 'sweetalert2'
axios.defaults.withCredentials = true;

const URL = 'http://conapdis.test/api/v1' // url del ambiente local
const URLBASE = 'http://conapdis.test'

//const URL = 'https://web.conapdis.gob.ve/api/v1'
//const URLBASE = 'https://web.conapdis.gob.ve'


const http = axios.create({
  baseURL: URL
});

const https = axios.create({
  baseURL: URL
});

const get_http = axios.create({
  baseURL: URL
});



let isAlreadyFetchingAccessToken = false;

http.interceptors.request.use((config) => {
  store.commit('loading', true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    const token: any = localStorage.getItem('_token');
    const tk = token ? String(token).split('"').join("") : "";
    config.headers.Authorization = `Bearer ${tk}`;
    //config.headers['Content-Type'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    /*  config.headers.Charset = 'uft-8'; */
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});

https.interceptors.request.use((config) => {
  store.commit('loading', true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    config.headers['Accept'] = '*/*'
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});

get_http.interceptors.request.use((config) => {
  store.commit('loading', true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    const token: any = localStorage.getItem('_token');
    const tk = token ? String(token).split('"').join("") : "";
    config.headers.Authorization = `Bearer ${tk}`;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = '*/*'
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});


http.interceptors.response.use((response) => {

  store.commit('loading', false);
  store.commit('errors', {});
  store.commit('error', false);
  return response;

}, async (error: any) => {
  // Stop loading regardless of error type
  store.commit('loading', false);

  const status = error && error.response ? error.response.status : undefined;
  if (status === 401) {
    await session.redirectLogin();
    return error;
  }

  if (error && error.response && error.response.data) {
    // Backend provided structured error
    return error.response.data;
  }

  // Network/CORS or unknown error without response
  store.commit('error', true);
  store.commit('errors', { message: 'Network/CORS error' });
  return Promise.reject(error);
});


export { http, https, get_http, URL, URLBASE };



