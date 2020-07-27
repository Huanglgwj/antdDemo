// 特殊表单render
import React from 'react';
import RadioButton from '@/components/form/components/radioButton';
import UploadImg from '@/components/form/components/uploadImg';
interface formProps {
    handleChange: any;
    columns: objectKey;
    initialValues?: any;
}
// 特殊的其他表单
const IsOther: React.FC<formProps> = (props) => {
    let { handleChange, columns, initialValues } = props;
    const [showUpload, setShowUpload] = React.useState<boolean>(Boolean(initialValues.is_course));
    function _handleChange(value: any, name: string) {
        // isother改变，切换是否显示上传图片
        if (name === 'isother') {
            setShowUpload(Boolean(value));
        }
        handleChange(value, name);
    }
    return (
        <div>
            <RadioButton handleChange={_handleChange} columns={columns} initialValues={initialValues} />
            {showUpload ? (
                <UploadImg handleChange={_handleChange} columns={{ name: 'course', className: 'mt-10' }} />
            ) : (
                ''
            )}
        </div>
    );
};
export default {IsOther}