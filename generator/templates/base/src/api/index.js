import router from '../router'
import axios from 'axios'
var qs = require('qs');

axios.defaults.transformRequest = [function (data) {
  if (!data) data = {};

  /**
   * 如果有上传图片功能，则需这样处理
   * formData.customType = 'upload';
   * api.uploadImage(formData).then()
   */
  // if (data.customType === 'upload') {
  //   return data;
  // }
  return qs.stringify(data)
}];

axios.defaults.transformResponse = [function (data) {
  const t = JSON.parse(data)
  t.code = +t.code

  /*if (t.code === 3) {
    // 特殊code特殊处理，如登录过期，跳转到登陆页
    
  } else */if(t.code !== 0){
    // 这样不必每次调用api后都判断code状态
    /**
     * api.login().then(res => {
     *   const data = res.data
     *   if(data.code === 0){
     *   }else{
     *     // 不必写alert(data.errmsg)
     *   }
     * })
     */
    alert(t.errmsg)
  }
  return t
}];


export default {

  login(params) {
    return axios.post("/api/login", params)
  }

}
