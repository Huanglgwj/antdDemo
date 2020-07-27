// 创建商品
import * as React from "react";
import FormModule from "@/components/form";
import indexForm from "./indexForm";
import * as APITEST from "@/apis/test";
import { message } from "antd";
const CategoryAdd: React.FC<{}> = props => {
  // 表单值
  const [initialValues, setInitialValues] = React.useState<objectKey>({});
  React.useEffect(() => {
    init();
  }, []);
  // 初始化设置默认表单值
  function init() {
    setInitialValues({
      name: "test",
      number: 1,
      checkbox:[0],
      radio:0,
      rate:1,
      select:1,
      switch:true,
      datePicker:'2019-01-01',
      rangePicker:['2019-01-01','2019-02-01'],
      isother:0
    });
  }
  // 表单值改变
  function onChange(_formValue: objectKey, name: string) {
    console.log(name, _formValue[name]);
  }
  // 保存提交
  async function callback(formValues: objectKey) {
    console.log("提交的表单为", formValues);
    message.success("保存成功");
  }
  return (
    <div>
      <FormModule
        initialValues={initialValues}
        key="form-index"
        dataForm={indexForm}
        onChange={onChange}
        callback={callback}
        otherOption={{buttonClassName:"ml-100"}}
      ></FormModule>
    </div>
  );
};
export default CategoryAdd;
