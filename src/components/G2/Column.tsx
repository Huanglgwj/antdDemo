// 柱状图
import React from 'react';
import { Column } from '@ant-design/charts';
// 默认设置参数
const defaultConfig = {
    data: [],
    title: {
        visible: true,
        text: '',
    },
    forceFit: true,
    padding: 'auto',
    xField: 'type',
    yField: 'sales',
    meta: {
        type: {
            alias: 'x标题',
        },
        sales: {
            alias: 'y标题',
        },
    },
};
const G2Chart: React.FC<{ config: objectKey }> = (props) => {
    const { config } = props;
    // 实际传递给图表的参数
    const [chartsConfig, setChartsConfig] = React.useState<any>(defaultConfig);
    React.useEffect(() => {
        setChartsConfig({ ...chartsConfig, ...config });
    }, [config]);
    return <Column {...chartsConfig} />;
};
export default G2Chart;
