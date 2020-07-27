import * as React from 'react';
import { useState } from 'react';
import { Upload, message, Modal } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { uploadUrl } from '@/config/env';
import Zmage from 'react-zmage'
interface uploadImgprops {
    handleChange: any;
    columns: objectKey;
    initialValues?: objectKey;
}
// 默认设置参数
const _defaultSetting = {
    // 文件类型
    fileType: ['image/jpeg', 'image/png'],
    // 最大上传数
    limit: 1,
    // 最大内存 MB
    size: 2,
};
const UploadImg: React.FC<uploadImgprops> = (props) => {
    let { handleChange, columns, initialValues = {} } = props;
    // 上传参数
    let [defaultSetting, setDefaultSetting] = useState<objectKey>({ ..._defaultSetting, ...columns });
    // base图片
    let [imageUrl, setImageUrl] = useState<any[]>([]);
    // 实际文件
    let [fileList, setFileList] = useState<any[]>([]);
    // 实际文件改变，触发回调父级
    React.useEffect(() => {
        let result = JSON.parse(JSON.stringify(fileList || []));
        // 只有一条就不传数组
        if (result.length === 1) {
            result = result[0];
        }
        handleChange(result, columns.name);
    }, [fileList]);
    React.useEffect(() => {
        const imgList = initialValues[columns.name];
        checkChangeImg(imgList);
    }, [initialValues]);
    // 检查表单是否图片修改了，修改了就切换
    function checkChangeImg(imgList: any) {
        // 如果只传了单独字符串，则转为数组处理
        if (imgList && typeof imgList === 'string') {
            imgList = [imgList];
        }
        let list = JSON.parse(JSON.stringify(imgList || []));
        if (list.length <= 0) {
            return;
        }
        // 判断和原本文件列表的url是否一致
        let inList = list.filter((item: string) => fileList.includes(item));
        // 如果交集数和原始数一样，则没有修改
        if (inList.length !== fileList.length || fileList.length === 0) {
            setFileList(list);
            setImageUrl(
                list.map((item: objectKey, index: number) => {
                    return { uid: index, name: 'image', status: 'done', url: item };
                }),
            );
        }
    }
    // 手动上传，把文件设置在fileList变量,本地预览在imageUrl变量
    function beforeUpload(file: objectKey, FileList: any[]) {
        const isJpgOrPng = defaultSetting.fileType.includes(file.type);
        if (!isJpgOrPng) {
            message.error('文件格式不对!');
        }
        const isLt2M = file.size / 1024 / 1024 < defaultSetting.size;
        if (!isLt2M) {
            message.error(`请上传 ${defaultSetting.size}MB 以内的文件!`);
        }
        // 不用自定义上传了，先不删
        // if (false) {
        //     let newFileList = [...fileList, file]
        //     setFileList(newFileList);
        //     getBase64(file, (image: string) =>
        //         setImageUrl([...imageUrl, { uid: Math.ceil(Math.random() * 1000), name: image, url: image }]),
        //     );
        //     handleUpload(newFileList)
        // }
        return isJpgOrPng && isLt2M;
    }
    // 点击删除
    function toRemove(file: objectKey) {
        const [index, newFileList, newImageUrl] = [fileList.indexOf(file), fileList.slice(), imageUrl.slice()];
        newFileList.splice(index, 1);
        imageUrl.splice(index, 1);
        setFileList(newFileList);
        setFileList(imageUrl);
    }
    // 查看大图
    function toPreview(file: objectKey) {
        let url = file.thumbUrl
        if(file && file.response && file.response.data){
            url = file.response.data[0].url
        }
        Zmage.browsing({src:url})
    }
    function getBase64(img: unknown, callback: (result: string) => void) {
        const reader: objectKey = new FileReader();
        reader.onload = (e: objectKey) => callback(e.target.result);
        reader.readAsDataURL(img);
    }
    // 文件改变时
    function toChange(props: objectKey) {
        const { file, fileList: _fileList } = props;
        // 每次文件改变都重新更新文件列表状态，否则会一直停留于uploading状态
        setImageUrl([..._fileList]);
        // 上传成功的文件加入到实际文件列表
        if (file.status === 'done') {
            setFileList([...fileList, file.response.data[0].url]);
        }
    }
    // 上传触发，不用自定义上传了，先不删
    // async function handleUpload(_fileList:any[]) {
    //     const result = await uploadImgAxios({ file: _fileList||fileList });
    //     handleChange(result, columns.name);
    //     return result;
    // }
    return (
        <div>
            <Upload
                fileList={imageUrl}
                listType="picture-card"
                className={`${columns.className || ''} form-uploader`}
                beforeUpload={beforeUpload}
                onChange={toChange}
                onRemove={toRemove}
                onPreview={toPreview}
                action={uploadUrl}
                name="files"
                data={{ image_account: 'website', image_password: '6bb5e5926f802b09ef6e87bdf97095a0' }}
            >
                {fileList.length >= defaultSetting.limit ? null : (
                    <PictureOutlined style={{ fontSize: '30px', color: '#999999' }} />
                )}
            </Upload>
        </div>
    );
};
export default UploadImg;
