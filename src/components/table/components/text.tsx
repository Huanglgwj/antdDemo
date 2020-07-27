import React from 'react';
// 表格文本类型
interface textProps {
    columnInfo: {
        value: string;
        column: objectKey;
        callback: any;
    };
}
const textModule: React.FC<textProps> = (props) => {
    const { value, callback ,column} = props.columnInfo;
    return <span onClick={callback} className={column.className}>{value}</span>;
};
export default textModule;
