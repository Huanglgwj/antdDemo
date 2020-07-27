import React from 'react';
import { Avatar, Modal } from 'antd';
import Zmage from 'react-zmage'
// 图片类型
interface TooltipProps {
    columnInfo: {
        value: any;
        column: objectKey;
        callback: any;
    };
}
const TooltipModule: React.FC<TooltipProps> = (props) => {
    const { value, callback, column } = props.columnInfo;
    return (
        <>
            <div  onClick={()=>Zmage.browsing({src:value})}>
                <Avatar size={column.size || 28} shape={column.shape || 'circle'} src={value} />
            </div>
        </>
    );
};
export default TooltipModule;
