import React from 'react';
import { Select } from 'antd';
import { getDict } from '@/apis/getDict/index';
import { CaretDownOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';
interface selectProps {
    handleChange: (value?: any, name?: string, other?: any) => void;
    columns: objectKey;
    initialValues?: objectKey;
}
let styleOption = { width: '224px' };
const SelectForm: React.FC<selectProps> = (props) => {
    let { handleChange, columns, initialValues = {} } = props;
    // 没有值需要设置成undefined才能显示placeholder
    let [defaultValue, setDefaultValue] = React.useState<string | number | undefined>(undefined);
    const selectChange = (value: string | number) => {
        setDefaultValue(value);
        handleChange(value, columns.name);
    };
    // 设置默认值
    React.useEffect(() => {
        if (initialValues &&  initialValues[columns.name] !== defaultValue) {
            initialValues[columns.name] = initialValues[columns.name] || undefined
            setDefaultValue(initialValues[columns.name]);
        }
    }, [initialValues]);
    // 如果不是直接传选项，则拿字典返回的数据选项
    let selectList = columns.selectList || getDict(columns.code) || [];
    return (
        <Select
            value={defaultValue}
            style={{ ...styleOption, ...(columns.style || {}) }}
            onChange={selectChange}
            placeholder={columns.placeholder || `请选择${columns.title}`}
            className={`${columns.className || ''} form-select`}
            suffixIcon={<CaretDownOutlined />}
        >
            {selectList.map((item: objectKey, index: number) => {
                return (
                    <Select.Option value={item.value} key={item.value}>
                        {item.text}
                    </Select.Option>
                );
            })}
        </Select>
    );
    // return (<Input onChange={inputChange} className="form-input" placeholder={columns.placeholder || `请输入${columns.title}`}/>)
};
export default SelectForm;
