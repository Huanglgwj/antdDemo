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
    // 当前值-时间格式
    let [defaultValue, setDefaultValue] = React.useState<any>([]);
    // 当前值-字符串格式
    let [defaultValueString, setDefaultValueString] = React.useState<any>([]);

    // 设置默认值
    React.useEffect(() => {
        if (
            initialValues &&
            initialValues[columns.name] &&
            Object.prototype.toString.call(initialValues[columns.name]) === '[object Array]' &&
            JSON.stringify(initialValues[columns.name]) !== JSON.stringify(defaultValueString)
        ) {
            let _initialValues = JSON.parse(JSON.stringify(initialValues));
            _initialValues[columns.name] = _initialValues[columns.name] || [];
            // 设置格式
            let format = 'YYYY-MM-DD';
            // 如果有动态传格式，则替换
            if (columns.params && columns.params.format) {
                format = columns.params.format;
            }
            _initialValues[columns.name] = _initialValues[columns.name].map((item: objectKey) => {
                return moment(item, format);
            });
            setDefaultValue(_initialValues[columns.name]);
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
        <div className={`${columns.className || ''} dis-inb`}>
            <span className="col-9">{columns.title}</span>
            <RangePicker
                value={defaultValue}
                className={`${columns.className || ''} form-time-pickert ml-5`}
                format={'YYYY-MM-DD'}
                style={{ ...styleOption, ...(columns.style || {}) }}
                onChange={valueChange}
                {...(columns.params || {})}
            />
        </div>
    );
};
export default RangePickerModule;
