/**
 * @param {Array} columns table表头设置数组
 * @param {Array} data table表格数据数组
 * @param {String} rowKey table表格key值
 * @param {Function} callback table列表项点击返回方法
 * @param {Object} rowSelection table列表选择栏参数
 * @param {Object} pagination 分页参数
 * @param {Boolean} loading 分页loading
 */
export interface tableIndexProps{
    columns: columnsProps[];
    data: object[];
    rowKey?: string;
    callback?: (name: string, data: objectKey, emit?: objectKey) => void;
    rowSelection?: rowSelectionProps;
    pagination?: objectKey;
    loading?: boolean;
}
/**
 * 列表项参数
 * @param {String} title 标题
 * @param {String} dataIndex 字段名
 * @param {String} type 显示类型 text/img/date/button/tooltip
 * @param {Number} width 宽度
 * @param {Boolean} ellipsis 超出隐藏-tooltip类型
 * @param {String} fixed 浮动 left/right
 * @param {Number} power 权限id
 * @param {Array} list 按钮列表-button类型
 * @param {String} align 排列方式 left/center/right
 */
interface columnsProps {
    title?:string,
    dataIndex?:string,
    type?:string,
    width?:number,
    ellipsis?:boolean,
    fixed?:string,
    list?:buttonProps[],
    power?:number,
    align?:string
}
/**
 * 按钮参数
 * @param {String|Object} title 标题 name | {name:'status',text:{2:'启用',1:'禁用'}}
 * @param {String} emit 回调方法标记
 * @param {Number} power 权限ID
 * @param {Boolean} popconfirm 点击是否先显示确定弹窗
 * @param {String} popconfirmTitle 确定弹窗标题
 * @param {string|Object} className name | {name:'status',text:{2:'',1:'col-red'}},
 */
interface buttonProps{
    title:string|objectKey,
    emit:string,
    power?:number,
    popconfirm?:boolean,
    popconfirmTitle?:string,
    className?:string|object,
}
/**
 * 列表选择栏
 * @param {Boolean} hide 显示隐藏
 * @param {String} type 类型 radio/checkbox
 * @param {Function} onChange 修改触发
 * @param {Object} selections 自定义选择项 配置项 {text,key,onSelect}
 * 
 */
interface rowSelectionProps{
    hide?: boolean;
    type?: string;
    selections?: object;
    onChange?: (selectedRowKeys: string, selectedRows: objectKey[]) => void;
}