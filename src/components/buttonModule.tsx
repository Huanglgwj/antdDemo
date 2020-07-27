// 表格按钮列表
import React from 'react';
import { Button } from 'antd';
import {connect} from 'react-redux'
/**
 * @param {Array} list 按钮列表
 * @param {Function} onClick 点击回调方法
 * @param {String} className 最外层class
 * @param {Array} menuListId redux权限id
 */
interface buttonProps {
    list?: itemProps[];
    onClick?: (data: objectKey) => void;
    className?: string;
    menuListId?: number[];
}
/**
 * @param {String} title 按钮文字
 * @param {String} className 按钮class
 * @param {String} type 按钮标记，回调根据标记判断业务
 * @param {String} buttonType 按钮样式分类 默认 'primary'
 * @param {Object} style 按钮style
 * @param {Number} power 按钮权限
 */
interface itemProps{
    title?:string,
    className?:string,
    type:string,
    buttonType?:string,
    style?:object,
    power?:number
}
const buttonModule:React.FC<buttonProps> = (props) => {
    let { list = [], onClick = function () {},className='',menuListId=[] } = props;
    // 过滤权限，有power参数且不在权限内则不显示
    const _list = list.filter((item:objectKey)=>{
        return (!item.power || (menuListId.includes(item.power)))
    })
    // 监听点击，返回触发按钮参数
    const handleClick = (data: objectKey) => {
        onClick(data);
    };
    return (
        <div className={className}>
            {_list.map((item: objectKey) => {
                return (
                    <Button
                        style={item.style||{}}
                        key={item.title}
                        className={`${item.className} table-button`}
                        type={item.buttonType || 'primary'}
                        onClick={() => handleClick(item)}
                    >
                        {item.title}
                    </Button>
                );
            })}
        </div>
    );
};
function mapStateToProps(state:objectKey){
    return {
        menuListId:state.reducerMenu.menuListId
    }
}
export default connect(mapStateToProps)(buttonModule);
