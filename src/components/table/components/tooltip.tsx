import React from 'react';
import {Tooltip} from 'antd'
// 自动省略类型 需要给column设置ellipsis = true
interface TooltipProps {
    columnInfo: {
        value: any;
        column: objectKey;
        callback: any;
    };
}
const TooltipModule: React.FC<TooltipProps> = (props) => {
    const { value, callback ,column} = props.columnInfo;
    return  <Tooltip placement="topLeft" title={value} >{value}</Tooltip>
};
export default TooltipModule;
