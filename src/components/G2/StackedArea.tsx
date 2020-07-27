// 面积图
import React from 'react';
import { StackedArea  } from '@ant-design/charts';
// 默认设置参数
const defaultConfig = {
    data: [],
    title: {
      visible: true,
      text: '',
    },
    description: {
      visible: true,
      text: '',
    },
    xField: 'date',
    yField: 'value',
    stackField: 'country',
    color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
    xAxis: {
      type: 'dateTime',
      tickCount: 5,
    },
    label: {
      visible: true,
      type: 'area',
      autoScale: true,
    },
    legend: {
      visible: true,
      position: 'right-top',
    },
    responsive: true,
};
const G2Chart: React.FC<{ config: objectKey }> = (props) => {
    const { config } = props;
    // 实际传递给图表的参数
    const [chartsConfig, setChartsConfig] = React.useState<any>(defaultConfig);
    React.useEffect(() => {
        setChartsConfig({ ...chartsConfig, ...config });
    }, [config]);
    return <StackedArea {...chartsConfig} />;
};
export default G2Chart;
