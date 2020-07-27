import React from "react";
import { Checkbox } from "antd";
interface checkboxProps {
  handleChange: any;
  columns: objectKey;
  initialValues?: objectKey;
}
const CheckBoxModule: React.FC<checkboxProps> = props => {
  let { handleChange, columns, initialValues = {} } = props;
  let [defaultValue, setDefaultValue] = React.useState<any>(null);
  const valueChange = (value: any) => {
    handleChange(value, columns.name);
    setDefaultValue(value);
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
  let selectList = columns.selectList || [];
  return (
    <Checkbox.Group onChange={valueChange} value={defaultValue}>
      {selectList.map((item: objectKey) => {
        return (
          <Checkbox value={item.value} key={item.value}>
            {item.text}
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};
export default CheckBoxModule;
