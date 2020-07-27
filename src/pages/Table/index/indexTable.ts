export default {
    tableList: [
        {
            title: 'ID',
            dataIndex: 'id',
            type: 'text',
            width: 110,
        },
        {
            title: '名称',
            dataIndex: 'name',
            type: 'text',
            width: 110,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            type: 'tooltip',
            ellipsis: true,
            width: 110,
        },
        {
            title: '更新时间',
            dataIndex: 'update_date',
            type: 'tooltip',
            ellipsis: true,
            width: 116,
        },
        {
            title: '操作',
            dataIndex: 'button',
            type: 'button',
            fixed: 'right',
            width: 150,
            list: [
                {
                    title: '查看详情',
                    emit: 'toDetail',
                },
                {
                    title: '权限测试',
                    emit: 'test',
                    power: 317,
                }
            ],
        },
    ],
    searchList:[
        {
            title: '发布时间',
            name: 'create_date',
            type: 'rangePicker',
            className: 'mr-10',
        },
        {
            title: '商品名称',
            name: 'input',
            type: 'input',
            className: 'mt-10 mr-10',
            style:{width:'250px'}
        },
        {
            title: '选项',
            name: 'select',
            type: 'select',
            className: 'mr-10',
            selectList:[
                {value:0,text:'select0'},
                {value:1,text:'select1'},
            ]
        },
    ],
    buttonList:[
        {
            title: '查询',
            type: 'search',
        },
        {
            title: '重置',
            type: 'reset',
            className:'ml-10'
        },
        {
            title: '导出',
            type: 'export',
            className:'ml-10',
            power:314
        },
    ]
}