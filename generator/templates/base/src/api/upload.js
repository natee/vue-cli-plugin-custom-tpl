import api from "./base";

export function upload(params) {
  let formData = new FormData();
  formData.customType = "upload"; // axios transformRequest拦截用

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const e = params[key];
      formData.append(key, e);
    }
  }

  return api.post('/api/upload', formData)
}