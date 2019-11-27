import api from "./base";

export function login (mobile, password) {
  return api.post("/api/user/login", {
    mobile: mobile,
    password: password
  })
}

export function logout (params) {
  return api.post("/api/user/logout", params);
}