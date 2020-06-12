import Axios from 'axios';
import { message } from 'antd';
import { history } from 'umi';

let base = '/v1/starry/saas';

// 请求前拦截
const axios = Axios.create();
axios.interceptors.request.use(
  config => {
    if (config.data && config.data.pageSize) {
      for (const i in config.data) {
        if (config.data[i] === '') {
          config.data[i] = null;
        }
      }
    }
    return { ...config, url: base + config.url, data: config.data || {} };
  },
  err => {
    console.log('请求超时');
    return Promise.reject(err);
  },
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    data = data.data;
    if (data.code !== 200) {
      message.error(data.msg);
      return Promise.reject(data);
    } //else if(!data.)
    return data;
  },
  err => {
    if (!err.response) {
      message.error('请求出错，请检查网络');
    } else if (err.response.status === 504 || err.response.status === 404) {
      message.error('服务器被吃了');
    } else if (err.response.status === 401) {
      message.error('登录信息失效，请重新登录');

      if (history.location.pathname.startsWith('/m/')) {
        history.push('/m/login');
      } else {
        history.push('/login');
      }
    } else if (err.response.status === 500) {
      message.error('服务器开小差了,请稍后重试');
    }
    return Promise.reject(err);
  },
);

// @RequestBody请求
const postRequestBody = (url, params, query) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    params: query,
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

// @RequsetParam请求
const postRequestParam = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = '';
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
      },
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

axios.postRequestParam = postRequestParam;
axios.postRequestBody = postRequestBody;
export default axios;
