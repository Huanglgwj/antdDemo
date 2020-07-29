import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
// 时间区间
interface rangePickerProps {
    handleChange: any;
    columns: objectKey;
    initialValues?: objectKey;
}
let styleOption = { width: '270px' };
const RangePickerModule: React.FC<rangePickerProps> = (props) => {
    let { handleChange, columns, initialValues = {} } = props;
    let [defaultValue, setDefaultValue] = React.useState<any>(null);
    let [defaultValueString, setDefaultValueString] = React.useState<string[]>([]);

    // 设置默认值
    React.useEffect(() => {
        if (
            initialValues &&
            initialValues[columns.name] &&
            Object.prototype.toString.call(initialValues[columns.name]) === '[object Array]' &&
            JSON.stringify(initialValues[columns.name]) !== JSON.stringify(defaultValueString)
        ) {
            // 设置格式
            let format = 'YYYY-MM-DD';
            // 如果有动态传格式，则替换
            if (columns.params && columns.params.format) {
                format = columns.params.format;
            }
            initialValues[columns.name] = initialValues[columns.name].map((item: objectKey) => {
                return moment(item, format);
            });
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
        setDefaultValueString(dateString);
    };
    return (
        <RangePicker
            value={defaultValue}
            className={`${columns.className || ''} form-time-pickert`}
            format={'YYYY-MM-DD'}
            style={{ ...styleOption, ...(columns.style || {}) }}
            onChange={valueChange}
            {...(columns.params || {})}
        />
    );
};
export default RangePickerModule;
