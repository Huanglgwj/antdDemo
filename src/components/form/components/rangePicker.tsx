import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
// 时间区间
interface rangePickerProps {
  handleChange: any;
  columns: objectKey;
  initialValues?: objectKey;
}
let styleOption = { width: "270px" };
const RangePickerModule: React.FC<rangePickerProps> = props => {
  let { handleChange, columns, initialValues = {} } = props;
  let [defaultValue, setDefaultValue] = React.useState<any>(null);

    // 设置默认值
    React.useEffect(() => {
        if (initialValues[columns.name] && Object.prototype.toString.call(initialValues[columns.name]) === '[object Array]') {
          let format = "YYYY-MM-DD";
          if (columns.params && columns.params.format) {
            format = columns.params.format;
          }
    
          initialValues[columns.name] = initialValues[columns.name].map(
            (item: objectKey) => {
              return moment(item, format);
            }
          );
          setDefaultValue(initialValues[columns.name]);
        }
      }, [initialValues]);
  const valueChange = (value: any, dateString: any) => {
    // 没有值时返回空数组
    if (!dateString[0] || !dateString[1]) {
      dateString = [];
    }
    handleChange(dateString, columns.name);
    setDefaultValue(value);
  };
  return (
    <RangePicker
      value={defaultValue}
      className={`${columns.className || ""} form-time-pickert`}
      format={"YYYY-MM-DD"}
      style={{ ...styleOption, ...(columns.style || {}) }}
      onChange={valueChange}
      {...(columns.params || {})}
    />
  );
};
export default RangePickerModule;
