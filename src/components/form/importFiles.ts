// 引入全部form类型文件
const requireComponent = require.context('./components', false, /\.tsx$/);
const componentsData:objectKey = {};
requireComponent.keys().forEach((fileName:string) => {
    // 组件内容
    const componentConfig = requireComponent(fileName);
    // 使用文件名作为组件名
    let componentsName = (<any>fileName.split('/')).pop().replace('.tsx', '');
    componentsName = componentsName.slice(0, 1).toUpperCase() + componentsName.slice(1);
    // 组件格式为{name:file}
    componentsData[componentsName] = componentConfig.default || componentConfig;
});
export default componentsData;
