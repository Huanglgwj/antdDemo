import React from 'react';
import { Input } from 'antd';
import { Item } from 'rc-menu';
interface textareaProps {
    handleChange: (value?: any, name?: string, other?: any) => void;
    columns: objectKey;
    initialValues?: objectKey;
}
let styleOption = { width: '400px' };
const TextareaForm: React.FC<textareaProps> = (props) => {
    let { handleChange, columns, initialValues = {} } = props;

    let [defaultValue, setDefaultValue] = React.useState<string>('');
    // 设置默认值
    React.useEffect(() => {
        if (initialValues[columns.name] !== undefined) {
            setDefaultValue(initialValues[columns.name].toString());
        }
    }, [initialValues]);
    const inputChange = (e: any) => {
        setDefaultValue(e.target.value)
        handleChange(e.target.value, columns.name);
    };
    return (
        <Input.TextArea
            rows={columns.rows || 4}
            value={defaultValue}
            style={{ ...styleOption, ...(columns.style || {}) }}
            onChange={inputChange}
            className={`${columns.className || ''} form-input`}
            placeholder={columns.placeholder || `请输入${columns.title}`}
        />
    );
};
export default TextareaForm;
