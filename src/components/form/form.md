# form 表单组件备注说明

> dataForm - 表单项参数值（Array）
> | 参数 | 说明 | 是否必填 | 类型 | 可选值 |
> | :---------- | :------------------------- |-------- | :------ | :-------|
> | title | 标题 | 是 | String | \* |
> | name | 字段名 | 是 | String | \* |
> | span | 宽度 | 否 | Number | 1-24 |
> | type | 类型 | 是 | String | input/select/switch/radio/checkbox/datePicker/rangPicker/timePicker/uploadImg/rate |
> | selectList | (select/radio/checkbox)选项数据 | 否 | Array | [{value:'',text:''}] |
> | rule | 校验 | 否 | Array | 具体看 ant 官网写法 |
> | style | style 值 | 否 | Object | _ |
> | className | className 值 | 否 | String | _ |
> | placeholder | placeholder 值 | 否 | String | \* |
> | labelAlign | 标题对齐方式 | 否 | String | left|right|center |

> initialValues - 初始化表单的表单值 (Object)

> callback - 点击保存回调方法(Function)

> otherOption - 表单组件其他参数（Object）
> | 参数 | 说明 | 是否必填 | 类型 | 默认值 |
> | :---------- | :------------- | :-------- | :------ | :-------|
> | labelCol | 标题宽度 | 否 | Object | { flex: '100px' } 具体写法参考官网 |
> | wrapperCol | 填写宽度 | 否 | Object | { flex: 'auto' } 具体写法参考官网 |
> | buttonClassName | 保存按钮 Class | 否 | String | |
> | buttonLoading | 保存按钮 Loading | 否 | String | |
> | buttonText | 保存按钮文字 | 否 | String | |

```javascript
const dataForm = [
    {
        name: 'role_id',
        title: '所属角色',
        span: 24,
        type: 'select',
        selectList: [],
    },
    {
        name: 'username',
        title: '姓名',
        span: 24,
        type: 'input',
    },
    {
        name: 'mobile',
        title: '手机',
        span: 24,
        type: '密码',
    },
    {
        name: 'password',
        title: '姓名',
        span: 24,
        type: 'input',
    },
];
const callback = (formValue) => {}
const initialValues = {name:1,id:2,sex:'男'}
<FromModule dataForm={dataForm} callback={callback} initialValues={initialValues}></FromModule>;
```
