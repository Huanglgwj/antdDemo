// 环形进度条
import React from 'react';
import { RingProgress } from '@ant-design/charts';
// 默认设置参数
const defaultConfig = {
    percent:0,
    width:124,
    height:124,
    color: () => {
      return ['#F4664A', '#E8EDF3'];
    }
};
const G2Donut: React.FC<{ config: objectKey }> = (props) => {
    const { config } = props;
    // 实际传递给图表的参数
    const [chartsConfig, setChartsConfig] = React.useState<any>(defaultConfig);
    React.useEffect(() => {
        const _chartsConfig = { ...chartsConfig, ...config }
        setChartsConfig(_chartsConfig);
    }, [config]);
    return <RingProgress {...chartsConfig} />;
};
export default G2Donut;
