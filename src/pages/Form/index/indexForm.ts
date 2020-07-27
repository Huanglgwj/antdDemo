import RenderForm from "./renderForm";
export default [
  {
    name: "name",
    title: "input",
    span: 12,
    type: "input",
    rules: [
      {
        required: true,
        message: "请填写名称"
      }
    ]
  },
  {
    name: "number",
    title: "number",
    span: 12,
    type: "number"
  },
  {
    name: "checkbox",
    title: "checkbox",
    span: 12,
    type: "checkbox",
    selectList: [
      { value: 0, text: "checkbox0" },
      { value: 1, text: "checkbox1" }
    ]
  },
  {
    name: "radio",
    title: "radio",
    span: 12,
    type: "radio",
    selectList: [
      { value: 0, text: "radio0" },
      { value: 1, text: "radio1" }
    ]
  },
  {
    name: "rate",
    title: "rate",
    span: 12,
    type: "rate"
  },
  {
    name: "switch",
    title: "switch",
    span: 12,
    type: "switch"
  },
  {
    name: "rangePicker",
    title: "rangePicker",
    span: 12,
    type: "rangePicker"
  },
  {
    name: "datePicker",
    title: "datePicker",
    span: 12,
    type: "datePicker"
  },
  {
    name: "time",
    title: "time",
    span: 12,
    placeholder: "请选择时间",
    type: "timePicker",
    rules: [
      {
        required: true,
        message: "请选择时间"
      }
    ],
    params: {
      format: "HH天mm时ss分",
      showNow: true
    }
  },
  {
    name: "select",
    title: "select",
    span: 12,
    type: "select",
    selectList: [
      { value: 86400, text: "1天" },
      { value: 86400 * 2, text: "2天" },
      { value: 86400 * 3, text: "3天" }
    ]
  },
  {
    name: "img",
    title: "uploadImg",
    span: 12,
    type: "uploadImg"
  },
  {
    name: "remark",
    title: "textarea",
    span: 12,
    type: "textarea"
  },
  {
    name: "editor",
    title: "editor",
    span: 24,
    type: "editor"
  },
  {
    name: "isother",
    title: "特殊的",
    span: 24,
    selectList: [
      { value: 0, text: "无" },
      { value: 1, text: "有" }
    ],
    render: RenderForm.IsOther
  }
];
