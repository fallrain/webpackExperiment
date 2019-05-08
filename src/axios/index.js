import axios from 'axios';
import qs from 'qs';

const ax = axios.create();
ax.defaults = Object.assign(
  ax.defaults,
  {
    withCredentials: true,
    baseURL: process.env.apiUrl
  },
);
ax.interceptors.request.use(config => config);
ax.interceptors.response.use((response) => {
  // 关闭遮罩
  // Vue.$vux.loading.hide();
  if (response.data.msg && response.data.msg.indexOf('请登录') >= 0) {
    window.location.href = process.env.loginUrl; // 跳转用户中心运营平台
  }
  if (!(response.config.params && response.config.params.requestNoToast)) {
    if (!response.data.isSuccess) {
      response.data.data = false;
      /* Message({
        showClose: true,
        message: response.data.msg || '请求失败',
        type: 'warning',
      }); */
    }
  }

  return response.data.data;
}, () =>
// Vue.$vux.loading.hide();
/* Message({
    showClose: true,
    message: '请求失败',
    type: 'warning',
  }); */
  false);
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
