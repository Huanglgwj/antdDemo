import React, { PureComponent } from 'react';
import axios from 'axios';
import { message } from 'antd';
import store from '@/redux/store';
import {Debounced} from '@/utils/util'
interface axiosOption {
    method?: string;
    url: string;
    data: object;
    loading?: boolean;
    needToken?: boolean;
}
// 错误信息
let errmsg:string = ''
const _Debounced = new Debounced().use(showError)
function showError(){
    if(!errmsg)return
    message.error(errmsg)
}
// 校验回调状态
function checkStatus(response: objectKey) {
    // 如果http状态码正常，则直接返回数据
    if (response && Number(response.errcode) === 0) {
        return true;
    }
    errmsg = response.errmsg
    // 异常状态下，把错误信息打出来
    _Debounced()
    // 登录过期去除状态
    if (response.errcode === 400) {
        store.dispatch({
            type: 'SETUSERINFO',
            values: null,
        });
        store.dispatch({
            type: 'SETMENULIST',
            values: [],
        });
        // 退回登录页
        const state = store.getState();
        errmsg = '登录失效'
        _Debounced()
        if (state.reducerUser.routerHistory && state.reducerUser.routerHistory.push) {
            state.reducerUser.routerHistory.push('/admin/login');
        } else {
            setTimeout(() => {
                window.location.href = '/admin/login';
            }, 1200);
        }
    }
    return false;
}
const _axios = (option: axiosOption) => {
    let { method = 'POST', url, data = {}, loading = false, needToken = false } = option;
    const _method = ['POST', 'post'].includes(method) ? 'POST' : 'GET';
    return new Promise((resolve, reject) => {
        axios({
            method: _method,
            url: url,
            data: data,
        }).then(
            (response) => {
                if (checkStatus(response.data) === false) reject();
                resolve(response.data.data);
            },
            () => {
                reject();
            },
        );
    });
};

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        config.headers['XX-Device-Type'] = 'pc';
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);
export default _axios;
