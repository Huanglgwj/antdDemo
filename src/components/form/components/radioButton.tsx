import React from 'react';
import { Radio } from 'antd';
interface radioProps {
    handleChange: any;
    columns: objectKey;
    initialValues?: objectKey;
}

const RadioButtonModule: React.FC<radioProps> = (props) => {
    let { handleChange, columns, initialValues = {} } = props;
    let [defaultValue, setDefaultValue] = React.useState<string|number>('');
    // 设置默认值
    React.useEffect(() => {
        if (initialValues[columns.name] !== undefined && initialValues[columns.name] !== defaultValue) {
            setDefaultValue(initialValues[columns.name]);
        }
    }, [initialValues]);
    const redioChange = (e: objectKey) => {
        handleChange(e.target.value, columns.name);
        setDefaultValue(e.target.value);
    };
    // 如果不是直接传选项，则拿字典返回的数据选项
    let selectList = columns.selectList  || [];
    return (
        <Radio.Group
            onChange={redioChange}
            value={defaultValue}
            className={`${columns.className || ''} form-radio-button`}
            buttonStyle="solid"
            size="middle"
        >
            {selectList.map((item: objectKey, index: number) => {
                return (
                    <Radio.Button value={item.value} key={item.value}>
                        {item.text}
                    </Radio.Button>
                );
            })}
        </Radio.Group>
    );
};
export default RadioButtonModule;
