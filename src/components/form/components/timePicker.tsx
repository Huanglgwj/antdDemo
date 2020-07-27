import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
interface timePickerProps {
    handleChange: any;
    columns: objectKey;
    initialValues?: objectKey;
}
let styleOption = { width: '224px' };

const TimePickerModule: React.FC<timePickerProps> = (props) => {
    let { handleChange, columns, initialValues = {} } = props;
    let [defaultValue, setDefaultValue] = React.useState<any>(undefined);

    // 设置默认值
    React.useEffect(() => {
        if (initialValues[columns.name] !== undefined) {
            setDefaultValue(moment(initialValues[columns.name],'hh:mm:ss'));
        }
    }, [initialValues]);
    const valueChange = (value: any, dateString: string) => {
        handleChange(dateString, columns.name);
        setDefaultValue(value);
    };
    return (
        <TimePicker
            value={defaultValue}
            className={`${columns.className || ''} form-time-picker`}
            format="hh:mm:ss"
            style={{ ...styleOption, ...(columns.style || {}) }}
            onChange={valueChange}
            placeholder={columns.placeholder || `请选择${columns.title}`}
            {...(columns.params || {})}
        />
    );
};
export default TimePickerModule;
