import * as React from 'react';
import { Table } from 'antd';
import _TableFile from './importFiles';
import {tableIndexProps} from './table.d'
// 默认分页参数
const defaultPage = {
    position: 'bottomRight',
    size: 'small',
    showQuickJumper: true,
    showTotal: (total: number) => {
        return `共 ${total} 条`;
    },
    pageSize: 10,
};
const TableFile: objectKey = _TableFile;
// 默认table选择栏设置
let rowSelectionDefault: objectKey = {
    type: 'checkbox',
    selections: {
        key: 'name',
    },
};
const TableModule: React.FC<tableIndexProps> = (props) => {
    let {
        columns,
        data,
        rowKey = 'id',
        callback = function () {},
        rowSelection = {},
        pagination = {},
        loading = false,
    } = props;
    pagination = { ...defaultPage, ...pagination };
    let setRowSelection: objectKey = { ...rowSelectionDefault, ...rowSelection };
    // 没有hide，则显示选择栏
    if (!setRowSelection.hide) {
        setRowSelection = { rowSelection: setRowSelection };
    }
    // 表格数据循环处理
    const columnsList:any[] = columns.filter((item: any, index: number) => {
        // type类型转为首字母大写
        let typeName = item.type.slice(0, 1).toUpperCase() + item.type.slice(1);
        // 根据type值匹配components文件名
        if (TableFile[typeName]) {
            // 动态设置组件名
            const TableModule = TableFile[typeName];
            // 默认居中
            item.align = item.align || 'center';
            item = Object.assign(item, {
                render: (text: any, record: any) => (
                    <TableModule
                        columnInfo={{
                            value: text,
                            column: item,
                            record: record,
                            callback: (emit: any) => callback(item.dataIndex, record, emit),
                        }}
                        key={item.dataIndex + item.typeName}
                    />
                ),
            });
            return item;
        }
    });
    return (
        <Table
            scroll={{ x: '100%' }}
            tableLayout="fixed"
            className="table-module"
            rowKey={rowKey}
            columns={columnsList}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            {...setRowSelection}
        ></Table>
    );
};
export default TableModule;
