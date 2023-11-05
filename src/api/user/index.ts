import request from "@/utils/request";
import { LoginData, UserInfo } from "./types";
import { AxiosPromise } from "axios";

export function loginApi(data: LoginData): AxiosPromise {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function getUserInfo(): AxiosPromise<UserInfo> {
  return request({
    url: "/user/me",
    method: "get",
  });
}
