import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

const ax = axios.create();
let loading;
ax.defaults = Object.assign(
  ax.defaults,
  {
    baseURL: process.env.apiUrl
  },
);

ax.interceptors.request.use((config) => {
  loading = message.loading('');
  return config;
});

ax.interceptors.response.use(
  (response) => {
    // 关闭遮罩
    loading();
    if (response.data.msg && response.data.msg.indexOf('请登录') >= 0) {
      // window.location.href = process.env.loginUrl; // 跳转用户中心运营平台

    }
    if (!(response.config.params && response.config.params.requestNoToast)) {
      if (!response.data.isSuccess) {
        response.data.data = false;
        message.warning(response.data.msg || '请求失败');
      }
    }

    return response.data.data;
  },
  (res) => {
    loading();
    message.warning(res || '请求失败');
    return false;
  }
);

const axGet = function (url, params) {
  return ax.get(url, {
    params,
  });
};

const axPost = function (url, data, params) {
  return ax({
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    url,
    data: qs.stringify(data),
    params,
  });
};
const axPostJson = function (url, data, params) {
  return ax({
    method: 'post',
    url,
    data,
    params,
  });
};
export default ax;

export { axGet, axPost, axPostJson };
