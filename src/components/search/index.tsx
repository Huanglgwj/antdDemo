// 表格搜索
import React from 'react';

import Input from '@/components/form/components/input';
import Select from '@/components/form/components/select';
import RangePicker from '@/components/search/components/rangePicker';
const FormFile: objectKey = { Input, Select, RangePicker };
/**
 * @params {Array} list 查询选项列表
 * @params {Function} onChange 表单改变回调
 * @params {Object} form 默认表单值
 * @params {String} className className
 * @params {Any} ref
 */
interface searchProps {
    list?: objectKey[];
    onChange?: (form: objectKey) => void;
    form?: objectKey;
    className?: string;
    ref?: any;
}
const SearchModule: React.FC<searchProps> = React.forwardRef((props, ref) => {
    let { list = [], onChange = function () {}, form = {}, className = '' } = props;
    // 默认form
    const [defaultForm] = React.useState<objectKey>(form);
    // 当前实际form
    const [realityForm,setRealityForm] = React.useState<objectKey>(form)
    React.useImperativeHandle(ref, () => ({
        // 重置,resetFormValue-自定义传递的表单值，不传则默认使用defaultForm
        resetForm: (resetFormValue?:objectKey) => setRealityForm(resetFormValue || defaultForm),
    }));
    // 监听值改变，修改form值,并回调
    const handleChange = (value: any, name: string) => {
        let formValue: objectKey = JSON.parse(JSON.stringify(realityForm));
        formValue[name] = value;
        setRealityForm(formValue);
        onChange(formValue);
    };

    return (
        <div className={className}>
            {list.map((item: objectKey) => {
                // 转为首字母大写
                let typeName = item.type.slice(0, 1).toUpperCase() + item.type.slice(1);
                // 动态设置组件名,如果是动态传的render，则使用render
                let SearchModule = item.render || FormFile[typeName];
                return (
                    <SearchModule
                        handleChange={handleChange}
                        columns={item}
                        key={item.name}
                        initialValues={realityForm}
                    />
                );
            })}
        </div>
    );
});
export default SearchModule;
