
/**
 * @param {Array} dataForm 表单项参数值
 * @param {Object} initialValues 表单初始form值
 * @param {Function} callback 保存回调方法
 * @param {Function} onChange 表单值改变回调
 * @param {Function} onChange 表单值改变回调
 * @param {Object} otherOption 表单其他参数 后续再写说明
 * @param {Object} ref 表单ref
 */
export interface formModuleProps{
    dataForm: dataFormItemProps[];
    initialValues?: objectKey;
    callback?: (data: objectKey) => void;
    onChange?: (data: objectKey, name: string) => void;
    otherOption?: otherOptionProps;
    ref?: any;
}
/**
 * 表单项参数
 * @param {String} name 字段名
 * @param {String} title 标题
 * @param {String} type 类型 input/radio/checkbox……
 * @param {Number} span 宽度
 * @param {Array} rules 校验规则 具体看antd官网
 * @param {Array} render HTML
 * @param {Object} params 其他参数 具体看各个antd组件的参数
 * 
 * */
interface dataFormItemProps {
    name?: string;
    title?: string;
    type?: string;
    span?: number;
    rules?: object[];
    render?: any;
    params?: object;
}
/**
 * 其他列表项参数
 * @param {Object} labelCol label宽度设置
 * @param {Object} wrapperCol warpper宽度设置
 * @param {Object} buttonStyle 保存按钮style
 * @param {String} buttonClassName 保存按钮class
 * @param {Boolean} buttonLoading 保存按钮loading
 * @param {String} buttonText 保存按钮文字
 * */
interface otherOptionProps{
    labelCol?:object,
    wrapperCol?:object,
    buttonStyle?:object,
    buttonClassName?:string,
    buttonLoading?:boolean,
    buttonText?:string,
}