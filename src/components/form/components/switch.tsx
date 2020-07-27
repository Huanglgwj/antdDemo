import React from 'react';
import { Switch  } from 'antd';

interface switchProps {
    handleChange: any;
    columns: objectKey;
    initialValues?: objectKey;
}
const SwitchsModule: React.FC<switchProps> = (props) => {
    let { handleChange, columns ,initialValues={}} = props;
    let [defaultValue, setDefaultValue] = React.useState<any>(null);

    const valueChange = (value: boolean) => {
        handleChange(value, columns.name);
        setDefaultValue(value);
    };
     // 设置默认值
  React.useEffect(() => {
    if (initialValues[columns.name] !== defaultValue) {
      setDefaultValue(initialValues[columns.name]);
    }
  }, [initialValues]);
    return (
        <Switch checked={defaultValue}  onChange={valueChange} />
    );
};
export default SwitchsModule;
