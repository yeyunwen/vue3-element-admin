import request from "@/utils/request";

export function loginApi(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return request({
    url: "/user/me",
    method: "get",
  });
}
