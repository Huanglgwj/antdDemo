let [axiosUrl, imgUrl, uploadUrl] = ['', '', ''];
// 开发环境
if (process.env.NODE_ENV === 'development') {
    axiosUrl = 'http://localhost:3000';
    imgUrl = '/';
    uploadUrl = '/';
}
export { axiosUrl, imgUrl,uploadUrl };
