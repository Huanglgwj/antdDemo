import React from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
// 富文本
interface editorProps {
  handleChange: (value?: any, name?: string, other?: any) => void;
  columns: objectKey;
  initialValues?: objectKey;
}
let styleOption = { width: "400px" };
const EditorForm: React.FC<editorProps> = props => {
  let { handleChange, columns, initialValues = {} } = props;

  let [defaultValue, setDefaultValue] = React.useState<string>("");
  // 设置默认值
  React.useEffect(() => {
    if (initialValues[columns.name] !== undefined) {
      const editorState = BraftEditor.createEditorState(
        initialValues[columns.name]
      );
      setDefaultValue(editorState);
    }
  }, [initialValues]);
  const inputChange = (editorState: any) => {
    setDefaultValue(editorState);
    handleChange(editorState.toHTML(), columns.name);
  };
  return (
    <div style={{width:'100%'}}>
      <BraftEditor
        value={defaultValue}
        onBlur={inputChange}
        placeholder={columns.placeholder || `请输入${columns.title}`}
        className={`${columns.className || ""} form-editor`}
      />
    </div>
  );
};
export default EditorForm;
