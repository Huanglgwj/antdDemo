import * as React from 'react';
import { Input } from 'antd';
import './input.less'
interface accoutLoginProps {
    onChange: (form: objectKey) => void;
    onEnter: () => void;
}

// 账号登录
const AccountLogin: React.FC<accoutLoginProps> = (props) => {
   
    const { onChange,onEnter} = props;
    let [form, setForm] = React.useState<objectKey>({username:'',password:''});
    function valueChange(e: objectKey, name: string) {
        let oldForm = JSON.parse(JSON.stringify(form));
        oldForm[name] = e.target.value;
        setForm(oldForm);
        onChange(oldForm);
    }
    function onKeyup(e:objectKey){
        if(e.keyCode === 13){
            onEnter()
        }
    }
    return (
        <>
            <Input
                onChange={(e) => valueChange(e, 'username')}
                placeholder="请输入账号"
                style={{ marginBottom: '20px' }}
                className="login-input"
                onKeyUp={onKeyup}
            />
            <Input.Password
                onChange={(e) => valueChange(e, 'password')}
                placeholder="请输入密码"
                style={{ marginBottom: '30px' }}
                onKeyUp={onKeyup}
                className="login-input"
            />
        </>
    );
};
export default AccountLogin;
