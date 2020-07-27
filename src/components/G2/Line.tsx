// 折线图图
import React from 'react';
import { Line } from '@ant-design/charts';
// 默认设置参数
const defaultConfig = {
    data: [],
    title: {
        visible: true,
        text: '多折线图',
      },
      description: {
        visible: true,
        text: '',
      },
      padding: 'auto',
      xField: 'date',
      yField: 'value',
      legend: {
        position: 'right-center',
      },
      seriesField: 'type',
      responsive: true,
};
const G2Chart: React.FC<{ config: objectKey }> = (props) => {
    const { config } = props;
    // 实际传递给图表的参数
    const [chartsConfig, setChartsConfig] = React.useState<any>(defaultConfig);
    React.useEffect(() => {
        setChartsConfig({ ...chartsConfig, ...config });
    }, [config]);
    return <Line {...chartsConfig} />;
};
export default G2Chart;
