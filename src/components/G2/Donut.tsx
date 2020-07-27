// 环图
import React from 'react';
import { Donut } from '@ant-design/charts';
// 默认设置参数
const defaultConfig = {
    data: [],
    forceFit: true,
    title: {
        visible: true,
        text: '',
    },
    description: {
        visible: true,
        text: '',
    },
    radius: 0.8,
    padding: 'auto',
    angleField: 'value',
    colorField: 'type',
};
const G2Donut: React.FC<{ config: objectKey }> = (props) => {
    const { config } = props;
    // 实际传递给图表的参数
    const [chartsConfig, setChartsConfig] = React.useState<any>(defaultConfig);
    // 直接return Donut标签value值会显示null，不知道为何，所以多加个SetDonut中转
    const SetDonut = () =>{
        return <Donut {...chartsConfig} />
    }
    React.useEffect(() => {
        setChartsConfig({ ...chartsConfig, ...config });
    }, [config]);
    return <SetDonut />;
};
export default G2Donut;
