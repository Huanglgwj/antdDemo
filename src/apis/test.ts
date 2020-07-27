import axios from "./axios";
import { axiosUrl } from "@/config/env";
// 菜单类别
export let menuList = (data: Object) =>
  axios({
    method: "GET",
    data: data,
    url: `${axiosUrl}/apiJson/menuList.json`,
    loading: true
  });

// 列表
export let list = (data: Object) =>
  axios({
    method: "GET",
    data: data,
    url: `${axiosUrl}/apiJson/list.json`,
    loading: true
  });
