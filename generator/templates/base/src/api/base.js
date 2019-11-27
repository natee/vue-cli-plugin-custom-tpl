import axios from 'axios'
var qs = require('qs');
import { storage } from "@/utils/storage";

axios.interceptors.request.use(function (config) {

  const method = config.method;
  // 登录后存储的token
  const token = storage.get("__token__");
  if (method === 'post') {
    if (!config.data) {
      config.data = {}
    }
    config.data.token = token;
  } else if (method === 'get') {
    if (!config.params) {
      config.params = {}
    }
    config.params.token = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (err) {
  return Promise.resolve(err.response);
});

axios.defaults.transformRequest = [function (data, headers) {
  if (!data) data = {};
  // 上传图片是FormData，无需处理，需注意要在调用上传接口增加参数customType用来判断
  if (data.customType === 'upload') {
    return data;
  }
  return qs.stringify(data);
}];

// 不需要报错的code
const specialCode = [
  0, 
];

function checkStatus(res) {
  if (res.status === 200 || res.status === 304) {
    return res
  }

  const url = res.config.url;
  const status = res.status;
  let errMsg = res.statusText;
  switch (status) {
    case 400: errMsg = '请求错误(400)'; break;
    case 401: errMsg = '未授权，请重新登录(401)'; break;
    case 403: errMsg = `请求${url}拒绝访问(403)`; break;
    case 404: errMsg = `请求${url}不存在(404)`; break;
    case 408: errMsg = `请求${url}请求超时(408)`; break;
    case 500: errMsg = `请求${url}服务器错误(500)`; break;
    case 501: errMsg = '服务未实现(501)'; break;
    case 502: errMsg = '网络错误(502)'; break;
    case 503: errMsg = '服务不可用(503)'; break;
    case 504: errMsg = '网络超时(504)'; break;
    case 505: errMsg = 'HTTP版本不受支持(505)'; break;
    default: errMsg = `连接出错(${status})!`;
  }

  return {
    data:{
      code: -404,
      errmsg: errMsg
    }
  };
}

function checkCode(res) {
  const data = res.data;
  const code = data.code;

  if (code === 4) {

    // login
    // ...
    return Promise.reject(data.errmsg);
  } else if (specialCode.indexOf(code) < 0) {
    alert(data.errmsg);
    return Promise.reject(new Error(data.errmsg || 'Error'))
  }

  return data.result
}

export default {

  post(url, params){
    return axios.post(url, params).then(checkStatus).then(checkCode);
  },

  get(url, params){
    return axios.get(url, { params: params }).then(checkStatus).then(checkCode);
  },

  download(params){
    return axios({
      url: '/api/download',
      method: 'post',
      responseType: 'blob',
      transformResponse: [function (data) {
        return data;
      }],
      data: params
    })
  }
}