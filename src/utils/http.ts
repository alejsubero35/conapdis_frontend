import axios from 'axios';
import session from '@/store/modules/sessionModule';
import store from '@/store';
import Swal from 'sweetalert2'
axios.defaults.withCredentials = true;

const URL     =  'http://conapdis.test/api/v1' // url del ambiente local
const URLBASE =  'https://conapdis.test' // url del ambiente local
//const URL     =  'https://conapdis.filicabh.com.ve/api/v1'
//const URLBASE =  'https://conapdis.filicabh.com.ve'

const http  = axios.create({
  baseURL: URL
});

const https = axios.create({
  baseURL: URL
});

const get_http = axios.create({
  baseURL: URL
});



let isAlreadyFetchingAccessToken = false;

http.interceptors.request.use( (config) => {
  store.commit('loading',true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    const token : any = localStorage.getItem('_token');
    const tk  = token?.replaceAll('"',"");
    config.headers.Authorization = `Bearer ${tk}`;
    //config.headers['Content-Type'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
   /*  config.headers.Charset = 'uft-8'; */
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});
  
https.interceptors.request.use( (config) => {
  store.commit('loading',true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    config.headers['Accept'] = '*/*'
    //const token = localStorage.getItem('_token');
   // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});

get_http.interceptors.request.use( (config) => {
  store.commit('loading',true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    const token : any = localStorage.getItem('_token');
    const tk  = token?.replaceAll('"',"");
    config.headers.Authorization = `Bearer ${tk}`;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = '*/*'
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});


http.interceptors.response.use( (response) => {

  store.commit('loading',false);
  store.commit('errors',{});
  store.commit('error',false);
  return response;

}, async (error: any) => {
  const { config, response: { status } } = error;

  if (status === 401) {
    await session.redirectLogin();
    return  error;
 }else{
   return  error.response.data;
 }
});


export { http, https, get_http, URL,URLBASE};



