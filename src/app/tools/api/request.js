import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:5000', // api 的 base_url
  timeout: 1000000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => config,
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use((response) => {
  const res = response.data;

  if (res.status === 404) {
    return Promise.reject(res);
  } if (res.status === 500) {
    // 非200的错误属于业务错误，留给具体页面处理
    return Promise.reject(res);
  }
  return Promise.resolve(res);
}, (error) => {
  console.log(`err${error}`);// for debug
  return Promise.reject(error);
});

export default service;
