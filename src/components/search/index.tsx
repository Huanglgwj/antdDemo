// 表格搜索
import React from 'react';

import Input from '@/components/form/components/input'
import Select from '@/components/form/components/select'
import RangePicker from '@/components/search/components/rangePicker'
const FormFile: objectKey = {Input,Select,RangePicker};
interface searchProps {
    list?: objectKey[];
    onChange?: (form: objectKey) => void;
    form?: objectKey;
    className?: string;
}
const SearchModule: React.FC<searchProps> = (props) => {
    let { list = [], onChange = function () {}, form = {} ,className=''} = props;
    // 监听值改变，修改form值,并回调
    const handleChange = (value: any, name: string) => {
        let formValue: objectKey = JSON.parse(JSON.stringify(form));
        formValue[name] = value;
        onChange(formValue);
    };
    return (
        <div className={className}>
             {list.map((item: objectKey, index: number) => {
                    // 转为首字母大写
                    let typeName = item.type.slice(0, 1).toUpperCase() + item.type.slice(1);
                    // 动态设置组件名,如果是动态传的render，则使用render
                    let SearchModule = item.render || FormFile[typeName];
                    return (<SearchModule handleChange={handleChange} columns={item}  key={item.name} />);
                })}
        </div>
    );
};
export default SearchModule;
