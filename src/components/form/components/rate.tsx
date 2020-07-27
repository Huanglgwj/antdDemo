import React from "react";
import { Rate } from "antd";

interface rateProps {
  handleChange: any;
  columns: objectKey;
  initialValues?: objectKey;
}
const RateModule: React.FC<rateProps> = props => {
  let { handleChange, columns, initialValues = {} } = props;
  let [defaultValue, setDefaultValue] = React.useState<any>(null);

  const valueChange = (value: number) => {
    handleChange(value, columns.name);
    setDefaultValue(value);
  };
  // 设置默认值
  React.useEffect(() => {
    if (initialValues[columns.name] !== defaultValue) {
      setDefaultValue(initialValues[columns.name]);
    }
  }, [initialValues]);
  return <Rate value={defaultValue} onChange={valueChange} />;
};
export default RateModule;
