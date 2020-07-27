# table 表格组件备注说明

> columns - 表头参数（Array）
> | 参数 | 说明 | 是否必填 | 类型 | 可选值 |
> | :---------- | :------------------------- |-------- | :------ | :-------|
> | title | 标题 | 是 | String | \* |
> | dataIndex | 字段名 | 是 | String | \* |
> | type | 类型 | 是 | String | text/rangePicker/button/img/tooltip |
> | width | 宽度 | 否 | String | |
> | className | className 值 | 否 | String | |
> | list | button 类型 button 列表 | 否 | String | |

> > list - button 类型 button 列表
> > | 参数 | 说明 | 是否必填 | 类型 | 可选值 |
> > | :---------- | :------------------------- |-------- | :------ | :-------|
> > | title | 标题 | 是 | String|Object | 添加|{name:'status',text:{2:'编辑',1:'添加'}}, |
> > | emit | 方法标记 | 是 | String | \* |
> > | role | 权限菜单 id | 否 | Number | \* |
> > | className | className | 否 | String | \* |
> > | popconfirm | 是否开启popconfirm | 否 | Boolean | true/false |
> > | popconfirmTitle | popconfirm标题 | 否 | String | \* |

> data - 表单数据(Array)

> rowKey - 表单列表 key 的名字 默认 id

> callback - 表单列表回调方法 (name:字段名,data:列表数据,emit:button 点击的方法标记)=>{}

> loading - loading

> rowSelection - 表格行是否可选择[配置项](https://ant.design/components/table-cn/#rowSelection) 传递了hide则是隐藏 {hide:true}

> pagination - 分页参数[配置项](https://ant.design/components/pagination-cn/)

```javascript
const tableList = [
    {
        title: 'ID',
        dataIndex: 'id',
        type: 'text',
        width: 90,
    },
    {
        title: '操作',
        dataIndex: 'button',
        type: 'button',
        list: [
            {
                title: '禁用',
                emit: 'toDisable',
                className: 'col-red',
            },
        ],
    },
];
const dataList = [{ id: 1 }];
const callback = (name: string, data: objectKey, emit: objectKey | undefined) => {
    console.log(name, emit);
};
const pagination = {
    total: 1,
    defaultCurrent: 1,
    pageSize: 10,
    onChange: () => {},
};
const onchange = (key: string, row: objectKey[]) => {};
<TableModule
    columns={tableList}
    data={dataList}
    key="article-index"
    callback={callback}
    pagination={pagination}
    rowSelection={{ onChange: onchange }}
    loading={true}
/>;
```
