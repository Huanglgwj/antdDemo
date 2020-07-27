import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './styles/default.less';
import RouterMap from './router/RouterMap';
import { Provider } from 'react-redux';
import store from '@/redux/store';
ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <RouterMap />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root'),
);
