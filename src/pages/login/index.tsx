import * as React from 'react';
import { Tabs, Button } from 'antd';
import MobileLogin from './components/mobileLogin';
import AccountLogin from './components/accountLogin';
import loginImg from '@/assets/login-img.png';
import './login.less';
import * as APITEST from '@/apis/test';
import store from '@/redux/store';
const Login: React.FC<{}> = (props: objectKey) => {
    const { history } = props;
    // 登录类型
    const [activeKey] = React.useState<string>('AccountLogin');
    let [loginForm, setLoginForm] = React.useState<objectKey>({});
    let [canSubmit, setCanSubmit] = React.useState<boolean>(false);
    // tabs改变
    function tabsChange(active: string) {
        checkSubmit(loginForm[active] || {});
    }
    // 表单改变
    function loginFormChange(name: string, form: objectKey) {
        let oldLoginForm = JSON.parse(JSON.stringify(loginForm));
        oldLoginForm[name] = form;
        setLoginForm(oldLoginForm);
        checkSubmit(form);
    }
    // 检测是否能提交
    function checkSubmit(form: object) {
        // 获取当前表单值数组
        let formValueList = Object.values(form);
        // 获取有值的字段数组
        let hasInputValue = formValueList.filter((value: string) => {
            if (value !== '') return value;
        });
        // 如果值相等则所有已填，选中按钮
        setCanSubmit(formValueList.length > 0 && hasInputValue.length === formValueList.length);
    }
    // 点击登录按钮
    function clickButton() {
        if (!canSubmit) return false;
        // 最终提交的表单
        const _loginForm:objectKey = loginForm[activeKey]
        // 获取菜单
        getMenu()
    }
    // 获取菜单
    async function getMenu() {
        let menuList: any = await APITEST.menuList({});
        // 登录名拿两种登录方式的不同字段  手机号或者用户名
        const loginName = loginForm[activeKey].mobile || loginForm[activeKey].username;
        // 存储菜单
        store.dispatch({
            type: 'SETMENULIST',
            values: menuList,
        });
        // 存储个人信息
        store.dispatch({
            type: 'SETUSERINFO',
            values: { loginName: loginName },
        });
        setTimeout(() => {
            history.replace('/admin');
        }, 200);
    }
    return (
        <div className="login-warp">
            <div className="login-bg"></div>
            <div className="login-content">
                <h1 className="text-center font-weight" style={{ fontSize: '50px', marginBottom: '70px' }}>
                    管理后台
                </h1>
                <div className="dis-flex flex-space-between">
                    <img src={loginImg} style={{ width: '433px', height: '303px' }} />
                    <div style={{ width: '346px', padding: '0 3px 0 3px' }}>
                        <Tabs defaultActiveKey={activeKey} className="login-tabs" onChange={tabsChange}>
                            <Tabs.TabPane tab="账号登录" key="AccountLogin">
                                <AccountLogin
                                    onEnter={clickButton}
                                    onChange={(form: objectKey) => loginFormChange('AccountLogin', form)}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="快捷登录" key="MobileLogin">
                                <MobileLogin
                                    onEnter={clickButton}
                                    onChange={(form: objectKey) => loginFormChange('MobileLogin', form)}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                        <Button onClick={clickButton} className={canSubmit ? 'login-button active' : 'login-button'}>
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
