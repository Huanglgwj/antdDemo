import React from 'react';
import { InputNumber  } from 'antd';
import { Item } from 'rc-menu';
interface inputNumberProps {
    handleChange: (value?: any, name?: string, other?: any) => void;
    columns: objectKey;
    initialValues?: objectKey;
}
let styleOption = { width: '400px' };
const NumberForm: React.FC<inputNumberProps> = (props) => {
    let { handleChange, columns, initialValues = {} } = props;

    let [defaultValue, setDefaultValue] = React.useState<number>();
    // 设置默认值
    React.useEffect(() => {
        if (initialValues[columns.name] !== undefined) {
            setDefaultValue(initialValues[columns.name].toString());
        }
    }, [initialValues]);
    const inputChange = (e: number) => {
        setDefaultValue(e)
        handleChange(e, columns.name);
    };
    return (
        <InputNumber 
            value={defaultValue}
            style={{ ...styleOption, ...(columns.style || {}) }}
            onChange={inputChange}
            className={`${columns.className || ''} form-input`}
            placeholder={columns.placeholder || `请输入${columns.title}`}
            {...columns.params || {}}
        />
    );
};
export default NumberForm;
