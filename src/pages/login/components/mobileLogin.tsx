import * as React from 'react';
import { Input, Button, message } from 'antd';
import validate from '@/utils/validate'
import './input.less'
interface mobileLoginProps {
    onChange: (form: objectKey) => void;
    onEnter?: () => void;
}
const MobileLogin: React.FC<mobileLoginProps> = (props) => {
    const { onChange,onEnter = ()=>{} } = props;
    let [form, setForm] = React.useState<objectKey>({mobile:'',code:''});
    // 是否在发送验证码中
    let [sendCodeIng,setSendCodeIng] = React.useState<boolean>(false)
    // 倒计时对象
    let [timeOutData,setTimeOutData] = React.useState<any>()
    // 倒计时按钮文字
    let [codeText,setCodeText] = React.useState<string>('获取验证码')
    function valueChange(e: objectKey, name: string) {
        let oldForm = JSON.parse(JSON.stringify(form));
        oldForm[name] = e.target.value;
        setForm(oldForm);
        onChange(oldForm);
    }
    // 发送验证码
    async function doSendCode(){
        if(sendCodeIng === true) return
        if(!validate.isMobile(form.mobile)){
            return message.warning('请输入正确手机号')
        }
        // await APILOGIN.SendCode({
        //     mobile:form.mobile,
        //     type:101
        // })
        countDown(60)
        setSendCodeIng(true)
    }
    // 倒计时
    function countDown(n:number){
        if(n<=0){
            setCodeText('获取验证码')
            setTimeOutData(null)
            return setSendCodeIng(false)
        }
        setCodeText((n--)+'S')
        const timeOut = setTimeout(()=>{
            countDown(n)
        },1000)
    }
    function onKeyup(e:objectKey){
        if(e.keyCode === 13){
            onEnter()
        }
    }
    return (
        <>
            <Input
                placeholder="请输入手机号"
                style={{ marginBottom: '20px' }}
                className="login-input"
                onChange={(e) => valueChange(e, 'mobile')}
            />
            <Input
                placeholder="输入验证码"
                style={{ marginBottom: '30px' }}
                className="login-input login-code"
                onKeyUp={onKeyup}
                onChange={(e) => valueChange(e, 'code')}
                addonAfter={<Button className="login-code-button" onClick={doSendCode}>{codeText}</Button>}
            />
        </>
    );
};
export default MobileLogin;
