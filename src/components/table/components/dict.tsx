import React from 'react';
// 字典类型
interface dictProps {
    columnInfo: {
        value: string;
        column: objectKey;
        callback: any;
    };
}
const Dict: React.FC<dictProps> = (props) => {
    const { value, callback ,column} = props.columnInfo;
    return <span onClick={callback} className={column.className}>{value}</span>;
};
export default Dict;
