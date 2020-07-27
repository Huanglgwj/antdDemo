import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
interface datePickerProps {
  handleChange: any;
  columns: objectKey;
  initialValues?: objectKey;
}
let styleOption = { width: "224px" };
const DatePickerModule: React.FC<datePickerProps> = props => {
  let { handleChange, columns, initialValues = {} } = props;
  let [defaultValue, setDefaultValue] = React.useState<any>(null);
   // 设置默认值
   React.useEffect(() => {
    if (initialValues[columns.name] !== undefined) {
      const format =
        columns.params && columns.params.format
          ? columns.params.format
          : "YYYY-MM-DD";
      setDefaultValue(moment(initialValues[columns.name], format));
    }
  }, [initialValues]);
  const valueChange = (value: any, dateString: string) => {
    handleChange(dateString, columns.name);
    setDefaultValue(value);
  };
  return (
    <DatePicker
      format="YYYY-MM-DD"
      showToday={true}
      value={defaultValue}
      style={{ ...styleOption, ...(columns.style || {}) }}
      className={`${columns.className || ""} form-date-picker`}
      onChange={valueChange}
      placeholder={columns.placeholder || `请选择${columns.title}`}
      {...(columns.params || {})}
    />
  );
};
export default DatePickerModule;
