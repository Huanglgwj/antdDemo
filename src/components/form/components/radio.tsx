import React from 'react';
import { Radio  } from 'antd';
interface radioProps {
    handleChange: any;
    columns: objectKey;
    initialValues?: objectKey;
}
const RadioModule: React.FC<radioProps> = (props) => {
    let { handleChange, columns,initialValues={} } = props;
    let [defaultValue, setDefaultValue] = React.useState<any>(null);
    const redioChange = (e:objectKey) => {
        handleChange(e.target.value, columns.name);
        setDefaultValue(e.target.value);
    };
     // 设置默认值
  React.useEffect(() => {
    if (
      (initialValues[columns.name] || initialValues[columns.name] === 0) &&
      initialValues[columns.name] !== defaultValue
    ) {
      setDefaultValue(initialValues[columns.name]);
    }
  }, [initialValues]);
    // 如果不是直接传选项，则拿字典返回的数据选项
    let selectList = columns.selectList  || [];
    return (
        <Radio.Group value={defaultValue} onChange={redioChange}  className={`${columns.className|| ''} form-radio`}>
             {selectList.map((item:objectKey) => {
                return (<Radio value={item.value} key={item.value}>{item.text}</Radio>)
            })}
        </Radio.Group>
    );
};
export default RadioModule;
