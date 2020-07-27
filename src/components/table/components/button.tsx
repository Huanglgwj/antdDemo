import React from 'react';
import { Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
// 表格操作按钮类型
/**
 * @param {Object} column 列表项
 * @param {Function} callback 点击返回方法
 * @param {object|undefined|null} record 列表值
 * @param {Array} menuListId 权限ID
 */
interface buttonProps {
    columnInfo: {
        column: objectKey;
        callback: Function;
        record: any;
    };
    menuListId: any;
}
// 确定弹窗
const PopconfirmType = (props: objectKey) => {
    const { title, item, handleClick, className } = props;
    return (
        <Popconfirm
            key={title}
            title={item.popconfirmTitle || '确认操作?'}
            onConfirm={() => handleClick(item)}
            okText="确定"
            cancelText="取消"
        >
            <Button size="small" type="link" className={`${className} col-main`}>
                {title}
            </Button>
        </Popconfirm>
    );
};
const ButtonType = (props: objectKey) => {
    const { title, className, handleClick, item } = props;
    return (
        <Button
            size="small"
            type="link"
            key={title}
            className={`${className} col-main`}
            onClick={() => handleClick(item)}
        >
            {title}
        </Button>
    );
};
const ButtonModule: React.FC<buttonProps> = (props) => {
    const { menuListId = [], columnInfo } = props;
    const { callback, column, record } = columnInfo;
    const handleClick = (data: objectKey) => {
        callback(data);
    };
    const { list: _buttonList = [] } = column;
    const [buttonList, setButtonList] = React.useState<objectKey[]>([]);
    React.useEffect(() => {
        setButtonList(
            _buttonList.filter((item: objectKey) => {
                return !item.power || menuListId.includes(item.power);
            }),
        );
    }, [_buttonList]);
    return (
        <>
            {buttonList.map((item: objectKey) => {
                const title = typeof item.title === 'object' ? item.title.text[record[item.title.name]] : item.title;
                const className =
                    typeof item.className === 'object'
                        ? item.className.text[record[item.className.name]]
                        : item.className;
                return item.popconfirm ? (
                    <PopconfirmType
                        key={title}
                        title={title}
                        item={item}
                        handleClick={handleClick}
                        className={className}
                    />
                ) : (
                    <ButtonType key={title} title={title} item={item} handleClick={handleClick} className={className} />
                );
            })}
        </>
    );
};
function mapStateToProps(state: objectKey) {
    return {
        menuListId: state.reducerMenu.menuListId,
    };
}
export default connect(mapStateToProps)(ButtonModule);
