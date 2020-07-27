import * as React from 'react';
import { formatDate } from '@/utils/util';
// 表格时间类型
interface dateProps {
    columnInfo: {
        value: string;
        column: objectKey;
        callback: any;
    };
}
const date: React.FC<dateProps> = (props) => {
    const { value, callback ,column} = props.columnInfo;
    return <span onClick={callback} className={column.className}>{formatDate(value)}</span>;
};
export default date;
