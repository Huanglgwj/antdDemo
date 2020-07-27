import * as React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { formModuleProps } from './form.d';
import _FormFile from './importFiles';
const FormFile: objectKey = _FormFile;
const FormModule: React.FC<formModuleProps> = React.forwardRef((props,ref) => {
    const {
        dataForm,
        initialValues = {},
        callback = function () {},
        onChange = function () {},
        otherOption = {}
    } = props;
    const [form] = Form.useForm();
    React.useImperativeHandle(ref,()=>({
        checkValues:()=>{
            return checkValues()
        }
    }))
    // 触发提交
    const formSubmit = async () => {
        // 校验成功返回父级
        const values = await checkValues();
        callback(values);
    };
    // 检查rule
    const checkValues = async () => {
        const values = await form.validateFields();
        return values;
    };
    // 默认值改变设置表单值
    React.useEffect(() => {
        form.resetFields();
    }, [initialValues]);
    // 监听值改变，修改form表单值
    const handleChange = (value: any, name: string) => {
        let formValue: objectKey = form.getFieldsValue();
        formValue[name] = value;
        form.setFieldsValue(formValue);
        onChange(formValue, name);
    };
    return (
        <Form
            labelCol={otherOption.labelCol || { flex: '100px' }}
            wrapperCol={otherOption.wrapperCol || { flex: 'auto' }}
            form={form}
            name="formModule"
            size="large"
            initialValues={initialValues}>
            <Row>
                {dataForm.map((item: objectKey, index: number) => {
                    // 转为首字母大写
                    let typeName = item.type ? item.type.slice(0, 1).toUpperCase() + item.type.slice(1) : '';
                    // 动态设置组件名,如果是动态传的render，则使用render
                    let FormModuleName = item.render || FormFile[typeName];
                    return (
                        <Col key={item.name} span={item.span || 24}>
                            <Form.Item
                                label={item.title}
                                name={item.name}
                                rules={item.rules || []}
                                labelAlign={item.labelAlign || 'right'}
                            >
                                <>
                                    <FormModuleName
                                        handleChange={handleChange}
                                        columns={item}
                                        initialValues={initialValues}
                                    />
                                    {item.tip ? <span className="col-9 fs-12 pl-10">{item.tip}</span> : ''}
                                </>
                            </Form.Item>
                        </Col>
                    );
                })}
            </Row>
            <Button
                type="primary"
                style={otherOption.buttonStyle}
                className={`${otherOption.buttonClassName} form-button`}
                onClick={formSubmit}
                loading={otherOption.buttonLoading || false}
                size="large"
            >
                {otherOption.buttonText || '保存'}
            </Button>
        </Form>
    );
});
export default FormModule;
